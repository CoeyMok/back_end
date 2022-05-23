const get = (req,res) => {
    let sql = 'SELECT * from dogs';
    let whereParams = [];
    if(Object.keys(req.query).length){
        sql += ` where `;

        let wheres = [];
        for (const key in req.query) {
            const whereStmt = `${key} = ?`;
            wheres.push(whereStmt);
            whereParams.push(req.query[key]);
        }

        sql +=  wheres.join(' AND ');

    }
    db.all(sql, whereParams, (err, result) => {
        if (err) {
            return res.status(401).end('error')
        } else {
          // do something with result
          if(result){
            return res.status(200).send({result})
          }
          else{
            return res.status(401).end('error')
          }
        }
      })
}

const getById = (req,res) => {
    db.get('SELECT * from dogs where id = ?', [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).end('error')
        } else {
          // do something with result
          if(result){
            return res.status(200).send({result})
          }
          else{
            return res.status(500).end('no record found')
          }
        }
      })
}

const create = (req,res) => {
    if(req.body.name === undefined || req.body.name === ''){
      return res.status(500).end('dog name missing')
    }
    
    if(req.body.age === undefined){
      return res.status(500).end('dog age missing')
    }
    
    if(req.body.breeds === undefined || req.body.breeds === ''){
      return res.status(500).end('dog breeds missing')
    }
    
    if(req.body.weight === undefined){
      return res.status(500).end('dog weight missing')
    }
    
    if(req.body.height === undefined){
      return res.status(500).end('dog height missing')
    }

    try{
      db.prepare("INSERT INTO dogs(name,age,breeds,weight,height) VALUES (?,?,?,?,?)",[
        req.body.name,
        req.body.age,
        req.body.breeds,
        req.body.weight,
        req.body.height
      ]).run().finalize();
      return res.status(200).send('dog create successfully')
    }catch(e){
      return res.status(500).end('insert db failed')
    }
}

const update = (req,res) => {
  try{
    let updates = [];
    let updateParams = [];
    if(req.params.id === undefined){
      return res.status(500).end('id missing')
    }
    if(Object.keys(req.body).length){
      
      for (const key in req.body) {
          const updateStmt = `${key} = ?`;
          updates.push(updateStmt);
          updateParams.push(req.body[key]);
      }
    }
    else{
      return res.status(500).end('update field missing')
    }
    db.prepare("UPDATE dogs SET " + updates.join(' , ') + "where id = " + req.params.id,[
      updateParams
    ]).run().finalize();
    return res.status(200).send('dog update successfully')
  }catch(e){
    return res.status(500).end('update db failed')
  }
}

module.exports = {get,getById,create,update}