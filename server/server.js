// Set Port to listen to. Either var or 3000
const PORT = process.env.PORT || 3000;

// Call in express 
const EXPRESS = require('express');
var app = EXPRESS();

// App set to use PUBLIC_PATH for render
const PATH = require('path');
const PUBLIC_PATH = PATH.join(__dirname, '../public');
app.use(EXPRESS.static(PUBLIC_PATH));

// Render index.html (Not Required)
// app.get('/', (req, res) => {
//     res.render('index.html');
// });

// Listen on PORT - return status when running
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});