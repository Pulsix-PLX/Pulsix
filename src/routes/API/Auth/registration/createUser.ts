import { action } from '@solidjs/router';
import { setAuth } from '~/GlobalStores/AuthStore';
import { db } from '~/Server/db.server';
import * as bcrypt from 'bcryptjs';

export const createUser = action(async (formData: {
  username: string;
  passwordConfirm: string;
  name: string;
  surname: string;
  dateOfBirthday: string;
  email: string;
  phone: string;
}) => {
  "use server";

  const { 
    username, 
    passwordConfirm: password, 
    name, 
    surname, 
    dateOfBirthday, 
    email, 
    phone 
  } = formData;

  console.log('username: ', username);
  console.log('password: ', password);
  console.log('name: ', name);
  console.log('surname: ', surname);
  console.log('dateOfBirthday: ', dateOfBirthday);
  console.log('email: ', email);
  console.log('phone: ', phone);

  // Validate input
  if (!password) {
    console.error('Password is required');
    return {
      success: false,
      error: 'Password is required'
    };
  }

  try {
    // Ensure password is a string
    const passwordToHash = String(password).trim();

    if (passwordToHash.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters long'
      };
    }

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(passwordToHash, saltRounds);

    const result = await db.query(
      `INSERT INTO users 
      (username, password, name, surname, date_of_birth, phone_number, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, username`,
      [
        username,
        hashedPassword,
        name,
        surname,
        dateOfBirthday,
        phone,
        email
      ]
    );

    const user = result.rows[0];
    
    return {
      success: true,
      userId: user.id,
      username: user.username
    };
  } catch (error: any) {
    console.error('Error during user insertion:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    };
  }
}, 'createUser');