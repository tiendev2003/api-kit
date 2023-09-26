// ----------------------------->>>>>>> Schemas <<<<<<<-----------------------------

// ---------------------*********** Authentication Schema ***********---------------------
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Bearer token authorization header
*/



// ************************* Users Schema *************************************

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       properties:
 *         id:
 *           type: ObjectId
 *           description: Id of the user
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *         role:
 *           type: string
 *           description: role of the user it will be either ROLE_USER, ROLE_ADMIN
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       example:
 *         name: shradha
 *         email: shradha@gmail.com 
 *         password: 123
 *         role: ROLE_ADMIN
 */

// ************************* Products Schema *************************************

/**
 * @swagger
 * components:
 *   schemas:
 *     Products:
 *       type: object
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: Id of the product
 *         title:
 *           type: string
 *           description: Title of the Product.
 *         imageURL:
 *           type: string
 *           description: Image of the Product.
 *         description:
 *           type: string
 *           description: Description of the Product.
 *         categoryId:
 *           type: ObjectId
 *           description: Category Id of Product Category.
 *         availability:
 *           type: boolean
 *           description: Availablitiy of that product (true/false).
 *         price:
 *           type: integer
 *           description: Price of Product
 *       example:
 *         _id: 647b63d83391dbb919246df6
 *         title: Product Name
 *         imageURL: Image of the Product
 *         description: Product Description
 *         category: 64f1f2a178821805b01ec334
 *         price: 1246
 *         availability: true
 */


// ************************* Category Schema *************************************

/**
 * @swagger
 * components:
 *   schemas:
 *     Categories:
 *       type: object
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: Id of the Category
 *         name:
 *           type: string
 *           description: Title of Category.
 *         description:
 *           type: string
 *           description: Description of Category.
 *       example:
 *         _id: 647b63d83391dbb919246df6
 *         name: Category Name
 *         description: Category Description
 */


// ************************* Order Schema *************************************

/**
 * @swagger
 * components:
 *   schemas:
 *     Orders:
 *       type: object
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: ID of the Order
 *         user:
 *           type: ObjectId
 *           description: ID of the User who placed the order
 *         items:
 *           type: array
 *           description: List of items in the order
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: ObjectId
 *                 description: ID of the Product in the order
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the Product in the order
 *         total:
 *           type: integer
 *           description: Total price of the order
 *         status:
 *           type: string
 *           enum: [Pending, Shipped, Delivered]
 *           default: Pending
 *           description: Status of the order (Pending, Shipped, Delivered)
 *       example:
 *         _id: 647b63d83391dbb919246df6
 *         user: 647b63d83391dbb919246df7
 *         items:
 *           - product: 647b63d83391dbb919246df8
 *             quantity: 2
 *           - product: 647b63d83391dbb919246df9
 *             quantity: 1
 *         total: 150.0
 *         status: Shipped
 */


// ************************* Cart Schema *************************************

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         product:
 *           type: ObjectId
 *           description: ID of the Product in the cart item
 *         quantity:
 *           type: integer
 *           description: Quantity of the Product in the cart item
 *       example:
 *         product: 647b63d83391dbb919246df8
 *         quantity: 2
 *
 *     Cart:
 *       type: object
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: ID of the Cart
 *         user:
 *           type: ObjectId
 *           description: ID of the User to whom the cart belongs
 *         items:
 *           type: array
 *           description: List of items in the cart
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *       example:
 *         _id: 647b63d83391dbb919246df7
 *         user: 647b63d83391dbb919246df6
 *         items:
 *           - product: 647b63d83391dbb919246df8
 *             quantity: 2
 *           - product: 647b63d83391dbb919246df9
 *             quantity: 1
 */


// ******************************************************************************************


// ************************** User Routes *************************************************

// Register the user

/**
 * @swagger
 * paths:
 *   /users/register:
 *     post:
 *       summary: Register a new user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       responses:
 *         201:
 *           description: User registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 example:
 *                   status: 201
 *                   success: true
 *                   message: Registration successful
 *                   data: 
 *                       name: Example Kumar
 *                       email: example123@gmail.com
 *                       password: $2b$1Fwo6wgApNDpTVQju1RpVux6b5Ql1U/jUI0cc6B1Z7UGZ9VFpmTUK
 *                       role: ROLE_USER, ROLE_ADMIN
 *                       _id: 64f4c625a9b674bd4bb6bc8e
 *                       createdAt: 2023-09-03T17:45:09.734Z
 *                       updatedAt: 2023-09-03T17:45:09.734Z
 *                       __v: 0
 *         500:
 *           description: Internal Server Error or contact the administrator or Signup Failed
 *         400:
 *           description: User already exists
 */

// Login the user

/**
 * @swagger
 * paths:
 *   /users/login:
 *     post:
 *       summary: Log in an existing user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Email of the user
 *                 password:
 *                   type: string
 *                   description: Password of the user
 *               required:
 *                 - email
 *                 - password
 *               example:
 *                 email: example123@gmail.com
 *                 password: example123
 *       responses:
 *         200:
 *           description: Login successful
 *           content:
 *             application/json:
 *               schema:
 *                 example:
 *                   status: 200
 *                   success: true
 *                   message: Login successful
 *                   token: eyJciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGYxYTliMWZiMGZjZWE5M2E0MjBhOWEiLCJpYXQiOjE2OTM1Nzc0ODYsImV4cCI6MTY5MzY2Mzg4Nn0.3x_QXasu0CHQHTmfUjldAJr_f6osfk_qMpV0Iuk
 *         500:
 *           description: Internal Server Error or Contact to administrator or Login Failed
 *         400:
 *           description: Invalid OTP
 *         401:
 *           description: User not found or Invalid Credentials
 *         404:
 *           description: Login failed
 */


// ********************************* Products Routes ****************************************

// Get product details by product ID

/**
 * @swagger
 * paths:
 *   /products/product/details/{productId}:
 *     get:
 *       summary: Get product details by product ID
 *       tags: [Products]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: productId
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the product to retrieve
 *       responses:
 *         '200':
 *           description: Product details retrieved successfully
 *           content:
 *             application/json:
 *               example:
 *                 status: 200
 *                 success: true
 *                 message: Product details retrieved successfully
 *                 data:
 *                   {
 *                     _id: "64f1f47978821805b01ec33d",
 *                     title: "One Plus 11r",
 *                     price: 39999,
 *                     description: "High-quality smartphone with advanced features.",
 *                     availability: true,
 *                     category: "64f1f3cd78821805b01ec33a",
 *                     __v: 0
 *                   }
 *         401:
 *           description: Token not provided
 *         404:
 *           description: Product not found or Invalid Product ID
 *         500:
 *           description: Internal Server Error or Contact the administrator
 */

// Get products by category ID

/**
 * @swagger
 * paths:
 *   /products/category/details/{categoryId}:
 *     get:
 *       summary: Get products by category ID
 *       tags: [Products]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: categoryId
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the category to filter products
 *       responses:
 *         200:
 *           description: Products retrieved successfully by Category ID
 *           content:
 *             application/json:
 *               example:
 *                 status: 200
 *                 success: true
 *                 message: Product details retrieved successfully
 *                 data:
 *                   - _id: 64f1f47978821805b01ec33d
 *                     title: One Plus 11r
 *                     price: 39999
 *                     description: High-quality smartphone with advanced features.
 *                     availability: true
 *                     category:
 *                       _id: 64f1f3cd78821805b01ec33a
 *                       name: Electronics
 *                       description: A category for electronic devices and gadgets.
 *                       createdAt: 2023-09-01T14:23:09.221Z
 *                       updatedAt: 2023-09-01T14:23:09.221Z
 *                       __v: 0
 *         404:
 *           description: No products found for this category
 *         500:
 *           description: Internal Server Error or Contact the administrator
 */

//  Add a new product

/**
 * @swagger
 * paths:
 *   /products/:
 *     post:
 *       summary: Add a new product
 *       tags: [Products]
 *       security:
 *          - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: Title of the new product
 *                 imageURL:
 *                   type: string
 *                   description: Image of the product
 *                 description:
 *                   type: string
 *                   description: Description of the new product
 *                 category:
 *                   type: string
 *                   description: ID of the category for the new product
 *                 availability:
 *                   type: boolean
 *                   description: Availability of the new product (true/false)
 *                 price:
 *                   type: integer
 *                   description: Price of the new product
 *               required:
 *                 - title
 *                 - category
 *                 - price
 *               example:
 *                 title: New Product
 *                 imageURL: image of the product
 *                 description: Product Description
 *                 category: 64f1f2a178821805b01ec334
 *                 availability: true
 *                 price: 999
 *       responses:
 *         201:
 *           description: Product added successfully
 *           content:
 *             application/json:
 *               example:
 *                 status: 201
 *                 success: true
 *                 message: Product added successfully
 *                 data:
 *                   _id: 64f1f47978821805b01ec33d
 *                   title: New Product
 *                   price: 999
 *                   description: Product Description
 *                   availability: true
 *                   category:
 *                     _id: 64f1f2a178821805b01ec334
 *                     name: Electronics
 *                     description: A category for electronic devices and gadgets.
 *                     createdAt: 2023-09-01T14:23:09.221Z
 *                     updatedAt: 2023-09-01T14:23:09.221Z
 *                     __v: 0
 *         404:
 *           description: Category not found
 *         500:
 *           description: Internal Server Error or Contact the administrator
 */

// Update product by product ID

/**
 * @swagger
 * paths:
 *   /products/{productId}:
 *     put:
 *       summary: Update product by product ID
 *       tags: [Products]
 *       security:
 *          - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: productId
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the product to update
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: New title of the product
 *                 imageURL:
 *                   type: string
 *                   description: imageURL title of the product
 *                 description:
 *                   type: string
 *                   description: New description of the product
 *                 availability:
 *                   type: boolean
 *                   description: New availability of the product (true/false)
 *                 price:
 *                   type: integer
 *                   description: New price of the product
 *               required:
 *                 - title
 *                 - price
 *               example:
 *                 title: Updated Product
 *                 imageURL: image of the product
 *                 description: Updated Product Description
 *                 availability: true
 *                 price: 1299
 *       responses:
 *         200:
 *           description: Product updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 status: 200
 *                 success: true
 *                 message: Product updated successfully
 *                 data:
 *                   _id: 64f1f47978821805b01ec33d
 *                   title: Updated Product
 *                   imageURL: Updated imageURL
 *                   price: 1299
 *                   description: Updated Product Description
 *                   availability: true
 *                   category:
 *                     _id: 64f1f2a178821805b01ec334
 *                     name: Electronics
 *                     description: A category for electronic devices and gadgets.
 *                     createdAt: 2023-09-01T14:23:09.221Z
 *                     updatedAt: 2023-09-01T14:23:09.221Z
 *                     __v: 0
 *         404:
 *           description: Product not found
 *         500:
 *           description: Internal Server Error or Contact the administrator
 */


// *********************** Category Routes ********************************************

// Get all categories

/**
 * @swagger
 * paths:
 *   /categories/:
 *     get:
 *       summary: Get all categories
 *       tags: [Categories]
 *       security:
 *          - BearerAuth: []
 *       responses:
 *         '200':
 *           description: All categories retrieved successfully
 *           content:
 *             application/json:
 *               example:
 *                 status: 200
 *                 success: true
 *                 message: All categories retrieved successfully
 *                 data: [
 *                   {
 *                     _id: '64f1f47978821805b01ec33d',
 *                     name: 'new category',
 *                     description: 'new category Description',
 *                     createdAt: '2023-09-01T14:23:09.221Z',
 *                     updatedAt: '2023-09-01T14:23:09.221Z',
 *                     __v: 0
 *                   }
 *                 ]
 *         '500':
 *           description: Internal Server Error or Contact the administrator
 */

// Get category by category ID

/**
 * @swagger
 * paths:
 *   /categories/{categoryId}:
 *     get:
 *       summary: Get category by category ID
 *       tags: [Categories]
 *       security:
 *          - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: categoryId
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the category to retrieve
 *       responses:
 *         200:
 *           description: Category retrieved successfully
 *           content:
 *             application/json:
 *               example:
 *                 status: 200
 *                 success: true
 *                 message: Category retrieved successfully
 *                 data: 
 *                   {
 *                     _id: '64f1f47978821805b01ec33d',
 *                     name: 'new category',
 *                     description: 'new category Description',
 *                     createdAt: '2023-09-01T14:23:09.221Z',
 *                     updatedAt: '2023-09-01T14:23:09.221Z',
 *                     __v: 0
 *                   }
 *         404:
 *           description: Category not found
 *         500:
 *           description: Internal Server Error or Contact the administrator
 */

// Create a new category

/**
 * @swagger
 * paths:
 *   /categories:
 *     post:
 *       summary: Create a new category
 *       tags: [Categories]
 *       security:
 *          - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Name of the new category
 *                 description:
 *                   type: string
 *                   description: Description of the new category
 *               required:
 *                 - name
 *               example:
 *                 name: New Category
 *                 description: Category Description
 *       responses:
 *         201:
 *           description: Category created successfully
 *           content:
 *             application/json:
 *               example:
 *                 status: 201
 *                 success: true
 *                 message: Category created successfully
 *                 data: 
 *                   {
 *                     _id: '64f1f47978821805b01ec33d',
 *                     name: 'new category',
 *                     description: 'new category Description',
 *                     createdAt: '2023-09-01T14:23:09.221Z',
 *                     updatedAt: '2023-09-01T14:23:09.221Z',
 *                     __v: 0
 *                   }
 *         500:
 *           description: Internal Server Error or Contact the administrator
 */




// *********************** Order Routes ********************************************

// Place an order

/**
 * @swagger
 * paths:
 *   /orders/place-order:
 *     post:
 *       summary: Place an order
 *       tags: [Orders]
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '201':
 *           description: Order placed successfully
 *           content:
 *             application/json:
 *               example:
 *                 status: 201
 *                 success: true
 *                 message: Order placed successfully
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *         '400':
 *           description: Bad Request (e.g., empty cart)
 *         '500':
 *           description: Internal Server Error or Contact the administrator
 */


// Get order history for an authenticated user

/**
 * @swagger
 * paths:
 *   /orders/order-history:
 *     get:
 *       summary: Get order history for an authenticated user
 *       tags: [Orders]
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '200':
 *           description: Order history retrieved successfully
 *           content:
 *             application/json:
 *               example:
 *                 status: 200
 *                 success: true
 *                 message: Order history retrieved successfully
 *                 data:
 *                   - $ref: '#/components/schemas/Order'
 *         '500':
 *           description: Internal Server Error or Contact the administrator
 */


// Get order details by order ID

/**
 * @swagger
 * paths:
 *   /orders/order-details/{orderId}:
 *     get:
 *       summary: Get order details by order ID
 *       tags:
 *         - Orders
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: orderId
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the order to retrieve
 *       responses:
 *         '200':
 *           description: Order details retrieved successfully
 *           content:
 *             application/json:
 *               example:
 *                 status: 200
 *                 success: true
 *                 message: Order details retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *         '404':
 *           description: Order not found
 *         '500':
 *           description: Internal Server Error or Contact the administrator
 */ 


// Update the order status by order ID

/**
 * @swagger
 * paths:
 *   /orders/update-order-status/{orderId}:
 *     patch:
 *       summary: Update the order status by order ID
 *       tags:
 *         - Orders
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: orderId
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the order to update
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: New status of the order
 *               required:
 *                 - status
 *               example:
 *                 status: 'Shipped'
 *       responses:
 *         '200':
 *           description: Order status updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 status: 200
 *                 success: true
 *                 message: Order status updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *         '404':
 *           description: Order not found
 *         '500':
 *           description: Internal Server Error or Contact the administrator
 */ 


// *********************** Cart Routes ********************************************

//  Add to Cart

/**
 * @swagger
 * paths:
 *   /cart/add-to-cart:
 *     post:
 *       summary: Add a product to the user's cart
 *       tags:
 *         - Cart
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                   description: ID of the product to add to the cart
 *                 quantity:
 *                   type: integer
 *                   description: Quantity of the product to add
 *               required:
 *                 - productId
 *                 - quantity
 *               example:
 *                 productId: '64f1f47978821805b01ec33d'
 *                 quantity: 2
 *       responses:
 *         '200':
 *           description: Product added to cart successfully
 *           content:
 *             application/json:
 *               example:
 *                 status: 200
 *                 success: true
 *                 message: Product added to cart successfully
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *         '400':
 *           description: Bad Request (e.g., invalid product or quantity)
 *         '404':
 *           description: Product not found
 *         '500':
 *           description: Internal Server Error or Contact the administrator
 */ 

//  View Cart

/**
 * @swagger
 * paths:
 *  /cart/view-cart/{userId}:
 *    get:
 *      summary: View the user's cart
 *      tags:
 *        - Cart
 *      responses:
 *        '200':
 *          description: Cart retrieved successfully
 *          content:
 *            application/json:
 *              example:
 *                status: 200
 *                success: true
 *                message: Cart retrieved successfully
 *                data:
 *                  $ref: '#/components/schemas/Cart'
 *        '404':
 *          description: Cart not found
 *        '500':
 *          description: Internal Server Error or Contact the administrator
 */ 

// Update Cart

/**
 * @swagger
 * paths:
 *  /cart/update-cart/{userId}:
 *    patch:
 *      summary: Update quantities of items in the user's cart
 *      tags:
 *        - Cart
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                items:
 *                  type: array
 *                  description: Array of updated cart items
 *                  items:
 *                    $ref: '#/components/schemas/CartItem'
 *              required:
 *                - items
 *              example:
 *                items:
 *                  - product: '64f1f47978821805b01ec33d'
 *                    quantity: 3
 *                  - product: '64f1f47978821805b01ec33e'
 *                    quantity: 1
 *      responses:
 *        '200':
 *          description: Cart updated successfully
 *          content:
 *            application/json:
 *              example:
 *                status: 200
 *                success: true
 *                message: Cart updated successfully
 *                data:
 *                  $ref: '#/components/schemas/Cart'
 *        '404':
 *          description: Cart not found
 *        '500':
 *          description: Internal Server Error or Contact the administrator
 */ 

// Remove from Cart

/**
 * @swagger
 * paths:
 *  /cart/remove-from-cart/{userId}/{productId}:
 *    delete:
 *      summary: Remove items from the user's cart
 *      tags:
 *        - Cart
 *      parameters:
 *        - in: path
 *          name: userId
 *        - in: path
 *          name: productId
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the product to remove from the cart
 *      responses:
 *        '200':
 *          description: Product removed from cart successfully
 *          content:
 *            application/json:
 *              example:
 *                status: 200
 *                success: true
 *                message: Product removed from cart successfully
 *                data:
 *                  $ref: '#/components/schemas/Cart'
 *        '404':
 *          description: Cart not found
 *        '500':
 *          description: Internal Server Error or Contact the administrator
 */

// 