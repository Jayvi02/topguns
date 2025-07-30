import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function POST() {
  try {
    await connectToDatabase();
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Sample firearms data
    const sampleProducts = [
      {
        name: "Glock 19 Gen 5",
        description: "9mm semi-automatic pistol with 15-round capacity. Perfect for concealed carry and home defense.",
        price: 599.99,
        images: ["/images/guns/Glock 19 Gen 5.jpeg"],
        category: "handguns",
        stock: 10,
        isActive: true
      },
      {
        name: "Smith & Wesson M&P Shield",
        description: "Compact 9mm pistol designed for concealed carry with excellent ergonomics and reliability.",
        price: 449.99,
        images: ["/images/guns/Smith & Wesson M&P Shield.jpg"],
        category: "handguns",
        stock: 15,
        isActive: true
      },
      {
        name: "AR-15 Tactical Rifle",
        description: "Semi-automatic rifle chambered in .223/5.56mm. Ideal for sport shooting and home defense.",
        price: 899.99,
        images: ["/images/guns/AR-15 Tactical Rifle.webp"],
        category: "rifles",
        stock: 8,
        isActive: true
      },
      {
        name: "Remington 700 Hunting Rifle",
        description: "Bolt-action rifle in .308 Winchester. Perfect for hunting and precision shooting.",
        price: 799.99,
        images: ["/images/guns/Remington 700.jpg"],
        category: "rifles",
        stock: 12,
        isActive: true
      },
      {
        name: "9mm FMJ Ammunition",
        description: "Full Metal Jacket 9mm ammunition, 115 grain. 50 rounds per box.",
        price: 24.99,
        images: ["/images/guns/9mm FMJ Ammunition.jpg"],
        category: "ammunition",
        stock: 100,
        isActive: true
      },

      {
        name: "Tactical Gun Case",
        description: "Heavy-duty tactical case with foam padding. Fits most handguns and accessories.",
        price: 89.99,
        images: ["/images/guns/tactical gun case.jpg"],
        category: "accessories",
        stock: 25,
        isActive: true
      },
      {
        name: "Red Dot Sight",
        description: "High-quality red dot sight with 2 MOA dot. Perfect for quick target acquisition.",
        price: 199.99,
        images: ["/images/guns/Red Dot Sight.webp"],
        category: "accessories",
        stock: 30,
        isActive: true
      }
    ];
    
    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    
    return NextResponse.json({
      message: 'Sample firearms data added successfully',
      count: createdProducts.length
    });
    
  } catch (error) {
    console.error('Error seeding data:', error);
    return NextResponse.json(
      { error: 'Failed to seed data' },
      { status: 500 }
    );
  }
} 