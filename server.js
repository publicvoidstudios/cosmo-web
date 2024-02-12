//Express.js is used to create server
const express = require('express');
//Path allows to know html, css files location
const path = require('path');
//Body parser allows to send and receive data
const bodyParser = require('body-parser');
//Knex allows to access database
const knex = require('knex');

//Make register user backlink. Connect database to server
const db = knex({
    //'pg' - because we use postgres
    client: 'pg',
    connection: {
        //Database host #
        host: '127.0.0.1',
        //PSQL user name
        user: 'postgres',
        //User's password
        password: 'master96',
        
        port: 5432,
        //Name of database
        database: 'contents'      
    }
})

//Authentication
const authenticate = require('./public/admin/auth.js');

//A way to create server with express.js
const app = express();

//As we have html files inside "public" folder, we need to make folder static path.
let initialPath = path.join(__dirname, 'public');
app.use(bodyParser.json());
app.use(express.static(initialPath));

//Create backlinks
//Main page
app.get('/', (req, res) => {
    //This is how files are sent from server
    res.sendFile(path.join(initialPath, 'index.html'));
})
//Admin panel
app.get('/admin', authenticate, (req, res) => {
    res.sendFile(path.join(initialPath, 'admin/admin.html'))
})
//Second part with lessons and materials for students
app.get('/students', (req, res) => {
    res.sendFile(path.join(initialPath, 'students.html'))
})

//CREATION REQUESTS
app.post('/create-section', (req, res) => {
    const { ms_name, ms_html_id, ms_img_url } = req.body;

    if(!ms_name.length || !ms_html_id.length || !ms_img_url.length){
        res.json('Fill all required fields');
    } else {
        db("sections").insert({
            name: ms_name,
            html_id: ms_html_id,
            img_url: ms_img_url,
        })
            .returning(["name", "html_id", "img_url"])
            .then(data => {
                res.json(`Created section with name: ${ms_name}, html id: ${ms_html_id}, image url: ${ms_img_url}.`)
            })
            .catch(err => {
                if(err.detail.includes('already exists')){
                    res.json('email already exists');
                }
            })
    }
})

app.post('/create-subsection', (req, res) => {
    const { sub_parent_name, sub_name, sub_html_id, sub_img_url } = req.body;

    if(!sub_parent_name.length || !sub_name.length || !sub_html_id.length || !sub_img_url.length){
        res.json('Fill all required fields');
    } else {
        db("subsections").insert({
            parent_section_name: sub_parent_name,
            subsection_name: sub_name,
            html_id: sub_html_id,
            img_url: sub_img_url,
        })
            .returning(["parent_section_name", "subsection_name", "html_id", "img_url"])
            .then(data => {
                res.json(`Created subsection with name: ${sub_name}, at parent: ${sub_parent_name}, with html id: ${sub_html_id}, image url: ${sub_img_url}.`)
            })
            .catch(err => {
                if(err.detail.includes('already exists')){
                    res.json('Record already exists');
                }
            })
    }
})

app.post('/create-content', (req, res) => {
    const { content_parent_name, content_type, content_param_1, content_param_2 } = req.body;

    if(!content_parent_name.length || !content_type.length || !content_param_1.length || !content_param_2.length){
        res.json('Fill all required fields');
    } else {
        db("content").insert({
            subsection_id: content_parent_name,
            content_type: content_type,
            param1: content_param_1,
            param2: content_param_2,
        })
            .returning(["subsection_id", "content_type", "param1", "param2"])
            .then(data => {
                res.json(`Created content with subID: ${content_parent_name}, type of: ${content_type}.`)
            })
            .catch(err => {
                console.error(err); // Log the error to the console
                res.json(err.detail);
            })
    }
})

//LOAD REQUESTS
app.post('/load-sections', (req, res) => {
    const { id, ms_name, ms_html_id, ms_img_url } = req.body;
    
    db.select('id', 'name', 'html_id', 'img_url')
        .from('sections')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.json('Error: No sections found.');
            }
        })
        .catch(err => {
            res.status(500).json('Error: ' + err);
        });
})

app.post('/load-subsections', (req, res) => {
    const { id, ss_parent_name, ss_name, ss_html_id, ss_img_url } = req.body;

    db.select('id', 'parent_section_name','subsection_name', 'html_id', 'img_url')
        .from('subsections')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.json('Error: No subsections found.');
            }
        })
        .catch(err => {
            res.status(500).json('Error: ' + err);
        });
})

app.post('/load-content', (req, res) => {
    const { id, content_parent_name, content_type, content_param_1, content_param_2 } = req.body;

    db.select("id","subsection_id", "content_type", "param1", "param2")
        .from('content')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.json('Error: No content found.');
            }
        })
        .catch(err => {
            res.status(500).json('Error: ' + err);
        });
})

//REMOVE REQUESTS
app.delete('/remove-section', (req, res) => {
    const { id } = req.body;

    db("sections")
        .where({ 
            id: id
        })
        .del()
        .then(() => {
            res.json(`Removed section with html id: ${id}.`);
        })
        .catch(err => {
            res.json(`Error removing section: ${err.message}.`);
        });
});

app.delete('/remove-subsection', (req, res) => {
    const { id } = req.body;

    db("subsections")
        .where({
            id: id
        })
        .del()
        .then(() => {
            res.json(`Removed subsection with id: ${id}.`);
        })
        .catch(err => {
            res.json(`Error removing section: ${err.message}.`);
        });
});

app.delete('/remove-content', (req, res) => {
    const { id } = req.body;

    db("content")
        .where({
            id: id
        })
        .del()
        .then(() => {
            res.json(`Removed content with id: ${id}.`);
        })
        .catch(err => {
            res.json(`Error removing content: ${err.message}.`);
        });
});

//Listen
app.listen(80, (req, res) => {
    console.log(`Listening on port: 3000 .....`)
})