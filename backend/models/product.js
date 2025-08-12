import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Name"],
      trim: true,
    },
    
    // Multiple images support
    images: {
      urls: [{
        type: String,
        required: [true, "Please Enter Photo URL"],
      }],
      image_ids: [{
        type: String,
        required: [true, "Please Enter Image ID"],
      }]
    },
    
    // Price with different types
    pricing: {
      type: {
        type: String,
        enum: ["fixed", "negotiable", "range"],
        required: [true, "Please Enter Price Type"],
        default: "fixed"
      },
      amount: {
        type: Number,
        required: function() {
          return this.pricing.type === "fixed";
        },
      },
      range: {
        type: String,
        enum: ["0-200", "200-500", "500+"],
        required: function() {
          return this.pricing.type === "range";
        },
      }
    },
    
    stock: {
      type: Number,
      required: [true, "Please Enter Stock"],
      min: [0, "Stock cannot be negative"],
    },
    
    discount: {
      type: Number,
    },
    
    brand: {
      type: String,
      required: [true, "Please Enter discount"],
    },
    
    category: {
      type: String,
      required: [true, "Please Enter Category"],
      trim: true,
      enum: ["fashion", "beauty", "electronics", "sports", "home", "books", "accessories"],
    },
    
    // New fields added
    productType: {
      type: String,
      required: [true, "Please Enter Product Type"],
      trim: true,
    },
    
    productDesign: {
      type: String,
      trim: true,
    },
    
    warranty: {
      type: String,
      enum: ["no-warranty", "3-months", "6-months", "1-year", "2-years", "3-years", "lifetime"],
      default: "no-warranty",
    },
    
    shipping: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    
    searchCategory: {
      type: String,
      trim: true,
      index: true, // For better search performance
    },
    
    details: {
      info: {
        type: String,
        required: [true, "Please Enter Details"],
      },
      colors: {
        type: [String],
        default: [],
      },
      sizes: {
        type: [String],
        default: [],
      },
      model: {
        type: String,
        required: function() {
          return this.category === "electronics";
        },
      },
    },
    
    // Rating and reviews
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      }
    },
    
    // Additional useful fields
    isActive: {
      type: Boolean,
      default: true,
    },
    
    tags: [{
      type: String,
      trim: true,
    }],
    
       
    metaDescription: {
      type: String,
      maxlength: 160,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
schema.index({ category: 1, isActive: 1 });
schema.index({ "pricing.type": 1, "pricing.amount": 1 });
schema.index({ searchCategory: "text", name: "text", "details.info": "text" });



// Virtual for display price
schema.virtual('displayPrice').get(function() {
  if (this.pricing.type === 'fixed') {
    return `$${this.pricing.amount}`;
  } else if (this.pricing.type === 'range' ) {
    return `$${this.pricing.range}`;
  } else {
        return `$${this.pricing.amount}`;

  }
});

// Virtual for main image
schema.virtual('mainImage').get(function() {
  return this.photos.urls[0] || null;
});

export const Product = model("Product", schema);