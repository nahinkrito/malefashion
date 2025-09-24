export const orders = [
  {
    id: 'order-1',
    userId: 'user-2',
    items: [
      {
        productId: 'product-1',
        name: 'Minimal Slim Fit T-shirt',
        price: 49.99,
        quantity: 2,
        color: '#000000',
        size: 'M',
        image: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        productId: 'product-5',
        name: 'Leather Chelsea Boots',
        price: 159.99,
        quantity: 1,
        color: '#000000',
        size: '9',
        image: 'https://images.pexels.com/photos/293406/pexels-photo-293406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      }
    ],
    shippingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      street: '456 User Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
      phone: '555-987-6543'
    },
    billingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      street: '456 User Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
      phone: '555-987-6543'
    },
    paymentMethod: 'credit_card',
    paymentDetails: {
      lastFour: '4242',
      cardType: 'Visa'
    },
    subtotal: 259.97,
    shippingCost: 9.99,
    tax: 21.00,
    total: 290.96,
    status: 'delivered',
    trackingNumber: 'TRK123456789',
    createdAt: '2023-11-10T14:23:45Z',
    updatedAt: '2023-11-15T09:30:00Z',
    deliveredAt: '2023-11-15T14:20:00Z'
  },
  {
    id: 'order-2',
    userId: 'user-2',
    items: [
      {
        productId: 'product-6',
        name: 'Wool Blend Overcoat',
        price: 219.99,
        discountedPrice: 175.99,
        quantity: 1,
        color: '#2E2E2E',
        size: 'L',
        image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      }
    ],
    shippingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      street: '456 User Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
      phone: '555-987-6543'
    },
    billingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      street: '456 User Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
      phone: '555-987-6543'
    },
    paymentMethod: 'credit_card',
    paymentDetails: {
      lastFour: '4242',
      cardType: 'Visa'
    },
    subtotal: 175.99,
    shippingCost: 9.99,
    tax: 14.08,
    total: 200.06,
    status: 'shipped',
    trackingNumber: 'TRK987654321',
    createdAt: '2023-11-20T10:15:22Z',
    updatedAt: '2023-11-21T16:45:00Z'
  },
  {
    id: 'order-3',
    userId: 'user-3',
    items: [
      {
        productId: 'product-2',
        name: 'Classic Denim Jacket',
        price: 129.99,
        discountedPrice: 110.49,
        quantity: 1,
        color: '#0F2953',
        size: 'M',
        image: 'https://images.pexels.com/photos/2866077/pexels-photo-2866077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        productId: 'product-3',
        name: 'Slim Fit Chino Pants',
        price: 79.99,
        quantity: 1,
        color: '#3E372F',
        size: '32',
        image: 'https://images.pexels.com/photos/3760610/pexels-photo-3760610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        productId: 'product-11',
        name: 'Premium Leather Belt',
        price: 49.99,
        quantity: 1,
        color: '#513A2A',
        size: '34',
        image: 'https://images.pexels.com/photos/1085527/pexels-photo-1085527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      }
    ],
    shippingAddress: {
      firstName: 'Mike',
      lastName: 'Johnson',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60007',
      country: 'USA',
      phone: '555-456-7890'
    },
    billingAddress: {
      firstName: 'Mike',
      lastName: 'Johnson',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60007',
      country: 'USA',
      phone: '555-456-7890'
    },
    paymentMethod: 'paypal',
    paymentDetails: {
      email: 'mike@example.com'
    },
    subtotal: 240.47,
    shippingCost: 0,
    tax: 19.24,
    total: 259.71,
    status: 'processing',
    createdAt: '2023-11-22T09:05:11Z',
    updatedAt: '2023-11-22T09:05:11Z'
  },
  {
    id: 'order-4',
    userId: 'user-2',
    items: [
      {
        productId: 'product-9',
        name: 'Leather Minimalist Wallet',
        price: 39.99,
        quantity: 1,
        color: '#43291F',
        size: null,
        image: 'https://images.pexels.com/photos/2079250/pexels-photo-2079250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      }
    ],
    shippingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      street: '456 User Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
      phone: '555-987-6543'
    },
    billingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      street: '456 User Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
      phone: '555-987-6543'
    },
    paymentMethod: 'credit_card',
    paymentDetails: {
      lastFour: '4242',
      cardType: 'Visa'
    },
    subtotal: 39.99,
    shippingCost: 4.99,
    tax: 3.20,
    total: 48.18,
    status: 'pending',
    createdAt: '2023-11-23T11:30:45Z',
    updatedAt: '2023-11-23T11:30:45Z'
  }
]