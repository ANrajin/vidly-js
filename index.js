const express = require('express');
const app = express();


/**
 * Middleware
 * import your middleware here
 * 
 */
const Logger = require('./middlewares/Logger');
app.use(Logger);
const Auth = require('./middlewares/Authentication');
app.use(Auth);



/**
 * Routes
 * Import your route files here
 */
const genres = require('./routes/Genres');
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is litening to ${port}`));

//requrest middleware
app.use(express.json());
