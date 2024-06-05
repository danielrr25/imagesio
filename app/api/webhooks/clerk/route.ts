import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { WebhookEvent } from '@clerk/nextjs/server';

import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('WEBHOOK_SECRET is not set in the environment variables');
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing Svix headers:', { svix_id, svix_timestamp, svix_signature });
    return new Response('Error occurred -- no svix headers', { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers 
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', { status: 400 });
  }

  // Log the entire event data
  console.log('Webhook event received:', evt);

  // Extract the event type and user ID
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);

  // Handle user creation event
  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username || '', // Use default empty string if username is not provided
      firstName: first_name || '', // Use default empty string if first name is not provided
      lastName: last_name || '', // Use default empty string if last name is not provided
      photo: image_url,
    };

    console.log('Creating user with data:', user);

    try {
      const newUser = await createUser(user);
      console.log('User created successfully:', newUser);
      return NextResponse.json({ message: 'OK', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response('Error creating user', { status: 500 });
    }
  }

  // Handle user update event
  if (eventType === 'user.updated') {
    const { id, image_url, first_name, last_name, username } = evt.data;

    const user = {
      firstName: first_name || '', // Use default empty string if first name is not provided
      lastName: last_name || '', // Use default empty string if last name is not provided
      username: username || '', // Use default empty string if username is not provided
      photo: image_url,
    };

    console.log('Updating user with data:', user);

    try {
      const updatedUser = await updateUser(id, user);
      console.log('User updated successfully:', updatedUser);
      return NextResponse.json({ message: 'OK', user: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      return new Response('Error updating user', { status: 500 });
    }
  }

  // Handle user deletion event
  if (eventType === 'user.deleted') {
    console.log(`Deleting user with ID: ${id}`);

    try {
      const deletedUser = await deleteUser(id!);
      console.log('User deleted successfully:', deletedUser);
      return NextResponse.json({ message: 'OK', user: deletedUser });
    } catch (error) {
      console.error('Error deleting user:', error);
      return new Response('Error deleting user', { status: 500 });
    }
  }

  return new Response('', { status: 200 });
}
