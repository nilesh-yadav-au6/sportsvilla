const Product = require('../../models/Products')

module.exports = {
    async getSearchedProduct(req,res){
        function escapeRegex(text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        };
        try{
        const { product , page , size, sort, amount} =req.query
        if(product){
            const Price = amount
            const regex =  new RegExp(escapeRegex(product));
            const se = await Product.find({search:regex})
            let obj = {}
            if(sort === "true"){
                obj.price = 1
            }
            else if(sort === "false"){
                obj.price = -1
            }
            const searchProduct = await Product.find({search:regex, price: {$lt: Price}}).limit(parseInt(size)).skip(parseInt(size)*(parseInt(page)-1)).sort(obj)
            if(false === isNaN(product)){
                const pe = await Product.find({price:product})
                const priceSearched  = await Product.find({price:product}).limit(parseInt(size)).skip(parseInt(size)*(parseInt(page)-1)).sort(obj)
                return res.json({ statusCode: 200, product: priceSearched, count: pe.length})
            }
            if(searchProduct){
                return res.json({ statusCode: 200, product: searchProduct, count: se.length})
            }
        }      
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    
    async getAllProduct (req,res){
        try{
            const { page ,size, sort, amount } =req.query
            const price = amount
            let obj = {}
            if(sort === "true"){
                obj.price = 1
            }
            else if(sort === "false"){
                obj.price = -1
            }
            const pro = await Product.find({price: { $lt: price}})
            const product = await Product.find({price: { $lt: price}}).limit(parseInt(size)).skip(parseInt(size)*(parseInt(page)-1)).sort(obj)
            if(!product) return res.status(400).json({ statusCode: 400, message: 'Bad Request'})
            return res.status(200).json({ statusCode: 200, product, count: pro.length})
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },

    async getSingleProduct(req,res){
        try{
            const { id } =req.query
            const product = await Product.findOne({_id:id})
            if(!product) return res.status(400).json({ statusCode: 400, message: 'Bad Request'})
            return res.status(200).json({ statusCode: 200, product})

    }catch(err){
        return res.status(500).json({ statusCode: 500, message: 'Server Error' })
    }
    },

    async getCatProduct(req,res){
        try{
            const { page ,size, category, sort, amount } =req.query
            const price = amount
            const count = await Product.find({category, price: {$lt: price}})
            let obj = {}
            if(sort === "true"){
                obj.price = 1
            }
            else if(sort === "false"){
                obj.price = -1
            }
            const product = await Product.find({category, price: {$lt: price}}).limit(parseInt(size)).skip(parseInt(size)*(parseInt(page)-1)).sort(obj)
            if(!product) return res.status(400).json({ statusCode: 400, message: 'No Such Category Exists'})
            return res.status(200).json({ statusCode: 200, product, count: count.length})
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    }
}