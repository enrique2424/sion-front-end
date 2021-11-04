import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import EditIcon from '@material-ui/icons/Edit';
import Icon from '@mui/material/Icon';
import CircularProgress from '@mui/material/CircularProgress';


// import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';

// amat: "antelo"
// apat: "cortez"
// ci: "5159165"
// correo: "mjcortez@gmail.com"
// createAt: "2021-11-04T04:00:00.000Z"
// fecha_nac: "2021-11-01T04:00:00.000Z"
// id: 1
// nacionalidad: "boliviana"
// nombre: "mario joaquin"
// updateAt: "2021-11-04T04:00:00.000Z"






export default function DataTable(props) {
 

    const columns = [
        {
            field: "delete",
            headerName: "Eliminar",
            sortable: false,
            width: 30,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div onClick={() => filaSeleccionada(params, 1)}>
                        <Tooltip title="Eliminar" arrow>
                            <DeleteIcon />
                        </Tooltip>
    
                    </div>
                );
            }
        },
        {
            field: "edit",
            headerName: "Editar",
            sortable: false,
            width: 30,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div onClick={() => filaSeleccionada(params, 2)}>
                        <Tooltip title="Editar" arrow>
                            <Edit />
                        </Tooltip>
    
                    </div>
                );
            }
        },
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'nombre', headerName: 'Nombre', width: 130 },
      { field: 'apat', headerName: 'A.Paterno', width: 130 },
      { field: 'amat', headerName: 'A.Materno', width: 130 },
      { field: 'correo', headerName: 'Correo', width: 130 },
      { field: 'nacionalidad', headerName: 'Nacionalidad', width: 130 },
      { field: 'ci', headerName: 'Cedula', width: 130 },
      { field: 'fecha_nac', headerName: 'Fecha de Nacimiento', width: 130 },
    
    ];

    // React.useEffect(() => {
    //    const llamarDatos = () => {
    //     obtenerClientes().then(data => {
    //         console.log(data);
    //         setRows(data);
    //         // rows.push(data);
    //     });
    //    }
    //    llamarDatos();
    // }, [props.actualizar]);



    const filaSeleccionada = (e, accion) => {
        if (accion === 1) {
            console.log('eliminar', e.row);
            props.setEliminar(Number(e.row.id));
            // props.history.push({
            //     pathname: '/transparencia-archivos',
            //     state: e.row
            // });

        } else {
            console.log('edit', e.row);
            props.setState(e.row);
            props.setValue(new Date(e.row.fecha_nac));
            props.setActualizar(true);
            // props.history.push({
            //     pathname: '/transparencia',
            //     state: e.row
            // });

        }
        // console.log(JSON.stringify(e.row, null, 4));
    }
  return (
    <div style={{ height: 400, width: '100%' }}>
     {
         props.rows.length > 0 ? (
            <DataGrid
            rows={props.rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
            disableSelectionOnClick={true}
          />
         ) :
         <CircularProgress />
     }
    </div>
  );
}