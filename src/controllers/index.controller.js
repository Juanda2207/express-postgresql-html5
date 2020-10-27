const { Pool } = require('pg');
const path = require ('path');
const { prependOnceListener } = require('process');

const pool = new Pool({

    host: 'ec2-54-156-53-71.compute-1.amazonaws.com',
    user: 'zsjyhwgjqaqsjq',
    password: 'b1086e1e4bb950e95fb13cfedccc9a2bd7cfba2f4134e9bb6fa4815820434e5c',
    database: 'dejjv8luqb4ocl',
    port: '5432'

});


const getUsers = async (req, res,next)=> {

    const dni = req.body.dni;
    const response = await pool.query(`SELECT * FROM pacientes WHERE dni='${String(dni)}'`);

    if(response.rows.length==0){
        res.redirect('/');
    }else{
        res.send(`<h1>Usuario encontrado</h1><p><b>Paciente:</b> ${response.rows[0].name}.<br>
        <b>Identificación:</b> ${response.rows[0].dni}.<br>
        <b>Enfermedad:</b> ${response.rows[0].enfermedad}.<p>`);
    }
}

const createUser = async (req, res)=>{

    const { name, dni, enfermedad} = req.body;

    await pool.query('INSERT INTO pacientes (name, dni, enfermedad) VALUES ($1, $2, $3)', [name, dni, enfermedad]);
    
    console.log('User created');

    res.redirect('/');

}

const editUser = async(req, res)=>{

    const { name, dni, enfermedad } = req.body;

    await pool.query(`UPDATE pacientes SET name='${String(name)}', enfermedad='${String(enfermedad)}' WHERE dni='${String(dni)}'`);

    console.log('User edited');

    const response = await pool.query(`SELECT * FROM pacientes WHERE dni='${String(dni)}'`);

    res.send(`<h1>Usuario editado</h1><p><b>Paciente:</b> ${response.rows[0].name}.<br>
    <b>Identificación:</b> ${response.rows[0].dni}.<br>
    <b>Enfermedad:</b> ${response.rows[0].enfermedad}.<p>`);

}

const deleteUser = async(req, res)=>{

    const dni = req.body.dni;
    const response = await pool.query(`SELECT * FROM pacientes WHERE dni='${String(dni)}'`);

    if(response.rows.length==0){
        console.log('User not deleted, because he doesnt exists');
        res.redirect('/');
    }else{
        res.send(`<h1>Usuario eliminado</h1><p><b>Paciente:</b> ${response.rows[0].name}.<br>
        <b>Identificación:</b> ${response.rows[0].dni}.<br>
        <b>Enfermedad:</b> ${response.rows[0].enfermedad}.<p>`);

        await pool.query(`DELETE FROM pacientes WHERE dni='${String(dni)}'`);
        console.log('user deleted');
    }

    

}


module.exports = {
    getUsers, createUser, editUser, deleteUser
}