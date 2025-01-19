import { HttpCode } from '../core/constants';
import { test, expect } from '@playwright/test';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// eslint-disable-next-line playwright/no-skipped-test
test.describe('User.register', () => {
	test.describe('Positive', () => {
		test('should register single User', async () => {
			const randomNumber = Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1000;
			const privateUserData = {
				email: `test${randomNumber}@gmail.com`,
				password: 'test1',
				confirmPassword: 'test1'
			};

			const createResponse = await axios.post(`${BASE_URL}/api/users/register`, privateUserData);

			expect(createResponse.status).toBe(HttpCode.CREATED);

			const createdItem = createResponse.data;

			expect(createdItem).toMatchObject({
				id: expect.stringMatching(UUID_REGEX),
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
				email: privateUserData.email
			});
		});
	});
	test.describe('Negative', () => {
		test('should not register User with mismatched passwords', async () => {
			const randomNumber = Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1000;
			const privateUserData = {
				email: `test${randomNumber}@gmail.com`,
				password: 'test1',
				confirmPassword: 'wrongPassword'
			};

			try {
				const createResponse = await axios.post(`${BASE_URL}/api/users/register`, privateUserData);
				expect(createResponse.status).not.toBe(HttpCode.CREATED);
			} catch (error) {
				expect(error.response.status).toBe(400);
				expect(error.response.data.message).toContain('Password and Confirm Password do not match.');
			}
		});
	});
});
