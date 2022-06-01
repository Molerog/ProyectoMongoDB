const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message); //Objet.values nos transforma el objeto entre paréntesis en un array para poder aplicar métodos de arrays
    if(errors.length > 1) {
        let chain = "";
        for (let i = 0; i < errors.length; i++) {
          chain += errors[i] + " || ";
        }
        const string = chain.slice(0, -4);
        res.status(400).send({messages: string});
    } else {
        res.status(400).send({messages: errors});
    }
 }

const typeError = (err, req, res, next) => {   
    const errOrigin = err.or
    console.log(err.name)
    if(err.name === 'ValidationError' || err.name === 'UniqueConstraintError'){
        return err = handleValidationError(err, res);
    }  else if (errOrigin === 'User'){
           res.status(500).send('We had an issue creating the User...');
        } else if (errOrigin === 'Comments'){
            res.status(500).send('We had an issue creating the Comments...');
        } else if (errOrigin === 'Post') {
        }
        else {
            res.status(500).send('There is an error in your sintaxis...');
        }  
    }

module.exports = { typeError }