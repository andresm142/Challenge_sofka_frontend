import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import BASE_URL from '../../services/.config';

export default function ListaCategoria(props) {

    //   const [listaCategorias, setListaCategorias] = useState([]);

    useEffect(() => {
        async function getListaCategorias() {

        }
    }, []);

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={listaCategorias}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Seleccione una categoria" size="small"

            />}

        // onChange={(e, value) => {
        //     if (value) {
        //         props.handleCultivo(value.id);
        //     }


        // }}
        />
    );
}

// Lista de categorias
const listaCategorias = [
    {
        label: 'Categoria 1'
    },
    {
        label: 'Categoria 2'
    },
    {
        label: 'Categoria 3'
    },
];

