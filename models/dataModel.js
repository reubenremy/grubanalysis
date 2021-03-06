const db = require("./conn");

class DataModel {
    constructor(id, name, distance, stars, category, favorite_dish, takeout, ate_last) {
        this.id = id;
        this.name = name;
        this.distance = distance;
        this.stars = stars;
        this.category = category;
        this.favorite_dish = favorite_dish;
        this.takeout = takeout;
        this.ate_last = ate_last;
    };

    static async getAllData() {
        try {
            const res = await db.any(`SELECT * FROM restaurant;`);
            return res;
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    static async getById(d_id) {
        try {
            const res = await db.any(`SELECT * FROM restaurant WHERE id=${d_id};`)
            return res;
        } catch(err) {
            console.log(err);
            return err;
        }
    }

    static async getAllReviews(d_id) {
        try {
            const res = await db.any(`
            SELECT 
            review.title,
            review.stars,
            review.review,
            users.first_name
            FROM review 
            INNER JOIN 
            users
            ON 
            review.reviewer_id = users.id
            WHERE
            restaurant_id=${d_id};
            `);
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    static async addReview(user_id, rest_id, stars, title, text) {
        try {
            const res = await db.one('INSERT INTO review (reviewer_id, restaurant_id, stars, title, review) VALUES ($1, $2, $3, $4, $5) RETURNING id',[user_id, rest_id, stars, title, text])
            return res;
        } catch(err) {
            console.log(err);
            return err;
        }
    }
};

module.exports = DataModel;
