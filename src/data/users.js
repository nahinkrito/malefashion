export const users = [
  {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'admin@example.com',
    password: 'admin123', // In a real app, this would be hashed
    role: 'admin',
    phone: '555-123-4567',
    address: {
      street: '123 Admin St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    createdAt: '2023-01-01T00:00:00Z'
  },
  {
    id: 'user-2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'user@example.com',
    password: 'user123', // In a real app, this would be hashed
    role: 'customer',
    phone: '555-987-6543',
    address: {
      street: '456 User Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    },
    createdAt: '2023-02-15T00:00:00Z'
  },
  {
    id: 'user-3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike@example.com',
    password: 'mike123', // In a real app, this would be hashed
    role: 'customer',
    phone: '555-456-7890',
    address: {
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60007',
      country: 'USA'
    },
    createdAt: '2023-03-10T00:00:00Z'
  }
]