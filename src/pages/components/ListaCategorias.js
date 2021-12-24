import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config/config.json';

export default function ListaCategoria(props) {

    const [listaCategorias, setListaCategorias] = useState([]);
    
    useEffect(() => {
        async function getListaCategorias() {

            await axios.get(`${config.HOST}/categoria`)
                .then(res => {
                    setListaCategorias(
                        res.data.categorias.map(categoria => {
                            return {
                                id: categoria._id,
                                label: categoria.nombre,
                                value: categoria.nombre,
                                nivel: categoria.nivel
                            }
                        })
                    );
                })
                .catch(err => {
                    if (err.response) {

                        alert(err.response.data.message);
                    } else {
                        alert("Error, contacte con el administrador");
                    }
                    console.log(err);
                });

        }

        getListaCategorias();
    }, []);

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={listaCategorias}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Seleccione una categoria" size="small"

            />}

            onChange={(e, value) => {
                if (value) {
                    props.handleCategoria(value.id, value.label, value.nivel);
                }

            }}
        />
    );
}

// Lista de categorias
// const listaCategorias = [
//     {
//         label: 'Categoria 1'
//     },
//     {
//         label: 'Categoria 2'
//     },
//     {
//         label: 'Categoria 3'
//     },
// ];

