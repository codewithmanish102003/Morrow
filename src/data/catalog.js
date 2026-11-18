// Morrow Store Initial Catalog Data
export const initialCategories = [
  {
    "id": "6d3b358d-0983-433e-a749-7679de8fa514",
    "name": "Clothing",
    "slug": "clothing",
    "description": "Considered pieces for days in motion.",
    "image_url": "/assets/category-clothing.jpg",
    "active": true,
    "sort_order": 1,
    "created_at": "2026-09-28T04:58:47.986996+00:00",
    "updated_at": "2026-09-28T04:58:47.986996+00:00"
  },
  {
    "id": "48193b6a-3077-4977-94a5-fb7afa5e9004",
    "name": "Seasonal",
    "slug": "seasonal",
    "description": "Good things for the season you are in.",
    "image_url": "/assets/category-seasonal.jpg",
    "active": true,
    "sort_order": 2,
    "created_at": "2026-09-28T04:58:47.986996+00:00",
    "updated_at": "2026-09-28T04:58:47.986996+00:00"
  },
  {
    "id": "fc89600c-6ff5-4d7b-9f78-31812e9eb51a",
    "name": "Beverages",
    "slug": "beverages",
    "description": "A little something to slow down for.",
    "image_url": "/assets/category-beverages.jpg",
    "active": true,
    "sort_order": 3,
    "created_at": "2026-09-28T04:58:47.986996+00:00",
    "updated_at": "2026-09-28T04:58:47.986996+00:00"
  }
];

export const initialProducts = [
  {
    "id": "b2e1e951-b3cb-482a-b0e2-cf2f84d5b1bc",
    "category_id": "6d3b358d-0983-433e-a749-7679de8fa514",
    "name": "The Everyday Linen Shirt",
    "slug": "everyday-linen-shirt",
    "description": "An easy silhouette in breathable linen. Made for late mornings, long lunches, and everything in between.",
    "sku": "CL-001",
    "price": 89,
    "sale_price": null,
    "stock": 24,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Ivory",
      "Olive"
    ],
    "specifications": {},
    "featured": true,
    "best_seller": true,
    "new_arrival": true,
    "active": true,
    "rating": 5,
    "created_at": "2026-09-28T04:58:47.986996+00:00",
    "updated_at": "2026-09-28T04:58:47.986996+00:00",
    "category": {
      "id": "6d3b358d-0983-433e-a749-7679de8fa514",
      "name": "Clothing",
      "slug": "clothing"
    },
    "images": [
      {
        "id": "e1c39a43-d0b9-48d7-9bde-b19c991e6163",
        "alt": "The Everyday Linen Shirt",
        "url": "/assets/product-shirt.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "783679b0-390d-4b41-993e-ed874148f0a4",
    "category_id": "6d3b358d-0983-433e-a749-7679de8fa514",
    "name": "The Relaxed Trouser",
    "slug": "relaxed-trouser",
    "description": "A beautifully relaxed shape with a tailored finish. Your most-worn pair, from the first wear.",
    "sku": "CL-002",
    "price": 118,
    "sale_price": 98,
    "stock": 18,
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Black",
      "Stone"
    ],
    "specifications": {},
    "featured": true,
    "best_seller": true,
    "new_arrival": false,
    "active": true,
    "rating": 5,
    "created_at": "2026-09-28T04:58:47.986996+00:00",
    "updated_at": "2026-09-28T04:58:47.986996+00:00",
    "category": {
      "id": "6d3b358d-0983-433e-a749-7679de8fa514",
      "name": "Clothing",
      "slug": "clothing"
    },
    "images": [
      {
        "id": "35d094ac-a2d3-4bd7-9441-2e34203ab474",
        "alt": "The Relaxed Trouser",
        "url": "/assets/product-trousers.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ccc9be2e-7d72-4408-a97c-a3565856cfe1",
    "category_id": "48193b6a-3077-4977-94a5-fb7afa5e9004",
    "name": "The Market Tote",
    "slug": "market-tote",
    "description": "A durable everyday companion in substantial cotton canvas. Carry a little, or carry it all.",
    "sku": "SE-001",
    "price": 48,
    "sale_price": null,
    "stock": 34,
    "sizes": [],
    "colors": [
      "Olive",
      "Natural"
    ],
    "specifications": {},
    "featured": true,
    "best_seller": true,
    "new_arrival": true,
    "active": true,
    "rating": 5,
    "created_at": "2026-09-28T04:58:47.986996+00:00",
    "updated_at": "2026-09-28T04:58:47.986996+00:00",
    "category": {
      "id": "48193b6a-3077-4977-94a5-fb7afa5e9004",
      "name": "Seasonal",
      "slug": "seasonal"
    },
    "images": [
      {
        "id": "3ede4236-90f0-414a-9662-a6e0fa07abb8",
        "alt": "The Market Tote",
        "url": "/assets/product-tote.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8df71d24-c33f-4527-8965-28419045afe6",
    "category_id": "fc89600c-6ff5-4d7b-9f78-31812e9eb51a",
    "name": "Pink Grapefruit Fizz",
    "slug": "pink-grapefruit-fizz",
    "description": "Bright, bittersweet grapefruit with an irresistibly fine sparkle. Made for the long way home.",
    "sku": "BE-001",
    "price": 12,
    "sale_price": null,
    "stock": 80,
    "sizes": [],
    "colors": [],
    "specifications": {},
    "featured": true,
    "best_seller": true,
    "new_arrival": true,
    "active": true,
    "rating": 5,
    "created_at": "2026-09-28T04:58:47.986996+00:00",
    "updated_at": "2026-09-28T04:58:47.986996+00:00",
    "category": {
      "id": "fc89600c-6ff5-4d7b-9f78-31812e9eb51a",
      "name": "Beverages",
      "slug": "beverages"
    },
    "images": [
      {
        "id": "e1dca3ca-0e52-40fe-934e-6ef21ceec53c",
        "alt": "Pink Grapefruit Fizz",
        "url": "/assets/product-soda.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "bf3dd45f-0c33-4a3a-8c50-137f28e48e92",
    "category_id": "48193b6a-3077-4977-94a5-fb7afa5e9004",
    "name": "The Coastal Sun Hat",
    "slug": "coastal-sun-hat",
    "description": "A timeless woven staple for sun-filled afternoons.",
    "sku": "SE-002",
    "price": 54,
    "sale_price": null,
    "stock": 15,
    "sizes": [],
    "colors": [
      "Natural"
    ],
    "specifications": {},
    "featured": false,
    "best_seller": false,
    "new_arrival": true,
    "active": true,
    "rating": 5,
    "created_at": "2026-09-28T04:58:47.986996+00:00",
    "updated_at": "2026-09-28T04:58:47.986996+00:00",
    "category": {
      "id": "48193b6a-3077-4977-94a5-fb7afa5e9004",
      "name": "Seasonal",
      "slug": "seasonal"
    },
    "images": [
      {
        "id": "a5ff0475-2a8b-426c-8be2-bfbcb02203ad",
        "alt": "The Coastal Sun Hat",
        "url": "/assets/category-seasonal.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b131db01-225a-4573-b2b9-4fc21e2125ec",
    "category_id": "fc89600c-6ff5-4d7b-9f78-31812e9eb51a",
    "name": "Sunlit Citrus Tonic",
    "slug": "sunlit-citrus-tonic",
    "description": "An uplifting citrus blend with a refreshing finish.",
    "sku": "BE-002",
    "price": 12,
    "sale_price": 10,
    "stock": 40,
    "sizes": [],
    "colors": [],
    "specifications": {},
    "featured": false,
    "best_seller": false,
    "new_arrival": true,
    "active": true,
    "rating": 5,
    "created_at": "2026-09-28T04:58:47.986996+00:00",
    "updated_at": "2026-09-28T04:58:47.986996+00:00",
    "category": {
      "id": "fc89600c-6ff5-4d7b-9f78-31812e9eb51a",
      "name": "Beverages",
      "slug": "beverages"
    },
    "images": [
      {
        "id": "49ab9fc5-f799-4ef0-8fa6-ed4133364889",
        "alt": "Sunlit Citrus Tonic",
        "url": "/assets/category-beverages.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "851793be-eaaa-4160-8811-dc5d61034df2",
    "category_id": "6d3b358d-0983-433e-a749-7679de8fa514",
    "name": "The Weekend Layer",
    "slug": "weekend-layer",
    "description": "Unstructured and understated, this is the layer that goes everywhere.",
    "sku": "CL-003",
    "price": 142,
    "sale_price": null,
    "stock": 12,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Olive"
    ],
    "specifications": {},
    "featured": false,
    "best_seller": false,
    "new_arrival": true,
    "active": true,
    "rating": 5,
    "created_at": "2026-09-28T04:58:47.986996+00:00",
    "updated_at": "2026-09-28T04:58:47.986996+00:00",
    "category": {
      "id": "6d3b358d-0983-433e-a749-7679de8fa514",
      "name": "Clothing",
      "slug": "clothing"
    },
    "images": [
      {
        "id": "f677afdf-6c06-4195-aac4-b8ce7b34f63a",
        "alt": "The Weekend Layer",
        "url": "/assets/category-clothing.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3a3f2797-224a-4fea-9683-ed6ba10a3862",
    "category_id": "48193b6a-3077-4977-94a5-fb7afa5e9004",
    "name": "The Striped Throw",
    "slug": "striped-throw",
    "description": "Soft textured cotton for the quieter moments.",
    "sku": "SE-003",
    "price": 72,
    "sale_price": null,
    "stock": 21,
    "sizes": [],
    "colors": [
      "Blue stripe"
    ],
    "specifications": {},
    "featured": false,
    "best_seller": false,
    "new_arrival": false,
    "active": true,
    "rating": 5,
    "created_at": "2026-09-28T04:58:47.986996+00:00",
    "updated_at": "2026-09-28T04:58:47.986996+00:00",
    "category": {
      "id": "48193b6a-3077-4977-94a5-fb7afa5e9004",
      "name": "Seasonal",
      "slug": "seasonal"
    },
    "images": [
      {
        "id": "e377b302-465e-4f61-bd3a-4b873059f291",
        "alt": "The Striped Throw",
        "url": "/assets/category-seasonal.jpg",
        "sort_order": 0
      }
    ]
  }
];

export const initialSettings = {
  "id": 1,
  "seasonal_title": "The season, considered.",
  "seasonal_description": "Pieces that invite you to slow down, step outside, and stay a little longer.",
  "seasonal_image_url": "/assets/category-seasonal.jpg",
  "seasonal_category_id": "48193b6a-3077-4977-94a5-fb7afa5e9004"
};
