import 'dotenv/config'
import express from 'express'
import Jimp from 'jimp'
import { engine } from 'express-handlebars'
import { nanoid } from 'nanoid'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express()
app.use(express.static(__dirname + '/public'))



app.get('/image', async (req, res) => {


    const imageUrl = req.query.imageUrl

    const image = await Jimp.read(imageUrl);

    const buffer = await image
        .resize(350, 350)
        .grayscale()
        .quality(60)
        .getBufferAsync(Jimp.MIME_JPEG)

    const dirname = __dirname + `/public/img/image-${nanoid()}.jpeg`
    await image.writeAsync(dirname)

    res.set("Content-Type", "image/jpeg")
    return res.send(buffer)

})

const PORT = process.env.PORT || 4500
app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)

})