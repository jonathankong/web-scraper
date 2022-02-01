const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');
const express = require('express');

const app = express();
const url = 'https://www.nintendo.com/en_CA/games/game-guide/#filter/:q=&dFR[generalFilters][0]=Deals';

axios(url)
    .then(response =>  {
        const html = response.data;
        console.log(html);
        const $ = cheerio.load(html);
        const arr = [];
        $('.tile', html).each(function(){
            const title = $(this).text();
            const priceDiscount = $(this).find('product-price').attr('sale-price');
            const priceOriginal = $(this).find('product-price').attr('msrp');
            arr.push({
                title, 
                priceDiscount,
                priceOriginal
            });
        })
        console.log(arr);
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
