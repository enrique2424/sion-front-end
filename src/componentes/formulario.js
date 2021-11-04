import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Button from "@mui/material/Button";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TransitionsSnackbar from "./toast";
import DataGrid from "./dataGrid";
export default function ValidationTextFields() {
  const initialState = {
    nombre: "",
    apat: "",
    amat: "",
    correo: "",
    nacionalidad: "",
    ci: "",
    fecha_nac: "",
  };
  const [state, setState] = React.useState(initialState);
  const [value, setValue] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [actualizar, setActualizar] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [eliminar, setEliminar] = React.useState(0);
  const obtenerClientes = async() =>{
      const response = await fetch('http://localhost:5000/api/clientes');
      const data = await response.json();
      console.log(data);
      return data;
  }

  React.useEffect(() => {
    obtenerClientes().then(data => {
      setRows(data);
     
    });
  }, []);

  React.useEffect(() => {
  if(eliminar !== 0){
    setOpen(true);
    eliminarCliente(eliminar).then(data => {
      console.log(data);
      setOpen(false);
      obtenerClientes().then(data => {
        setRows(data);
       
      });
    });

 
  }
  }, [eliminar]);

  const eliminarCliente = async(id) =>{
    const response = await fetch(`http://localhost:5000/api/clientes/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    setOpen(true);
    console.log(data);
    return data;
  }

  const handleChangeDate = (newValue) => {
    setState({ ...state, fecha_nac: new Date(newValue).toLocaleDateString() });
    setValue(newValue);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const guardar = () => {
    const valor = validar();
    console.log(valor);

    if (valor) {
      console.log(valor);

      insertar(state);
    } else {
      setOpen(false);
    }
  };

  const updateCliente = () => {
    const valor = validar();

    if (valor) {
      console.log(valor);
      const {amat, apat , nombre, ci, fecha_nac, nacionalidad, correo , id} = state;
      actualizarCliente(id,  {amat, apat , nombre, ci, fecha_nac, nacionalidad, correo });
    } else {
      setOpen(false);
    }
  };

  const validar = () => {
    if (
      state.nombre === "" ||
      state.apat === "" ||
      state.amat === "" ||
      state.correo === "" ||
      state.nacionalidad === "" ||
      state.ci === "" ||
      state.fecha_nac === ""
    ) {
      return false;
    }
    return true;
  };

  const insertar = async (json) => {
    const response = await fetch("http://localhost:5000/api/clientes", {
      method: "POST",
      body: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.length > 0) {
      setOpen(true);
      setState(initialState);
      setValue(new Date());
      obtenerClientes().then(data => {
        setRows(data);
      });
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else {
      console.log("Error al guardar");
    }
  };

  const actualizarCliente = async (id,json) => {
    const response = await fetch("http://localhost:5000/api/clientes/" + id, {
      method: "PUT",
      body: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.length > 0) {
      setOpen(true);
      setState(initialState);
      setValue(new Date());
      obtenerClientes().then(data => {
        setRows(data);
      });
      setActualizar(false);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else {
      console.log("Error al actualizar");
    }
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            error={state.nombre === ""}
            id="filled-error-helper-text"
            label="nombre"
            name="nombre"
            value={state.nombre}
            placeholder="nombre completo"
            helperText="llene este campo."
            variant="filled"
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <TextField
            error={state.apat === ""}
            id="filled-error-helper-text"
            label="apellido Paterno"
            name="apat"
            value={state.apat}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Paterno"
            helperText="llene este campo."
            variant="filled"
          />

          <TextField
            error={state.amat === ""}
            id="filled-error-helper-text"
            label="apellidos Materno"
            placeholder="Materno"
            helperText="llene este campo."
            variant="filled"
            name="amat"
            value={state.amat}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <div>
          <TextField
            error={state.correo === ""}
            id="filled-error-helper-text"
            label="correo"
            placeholder="email"
            helperText="llene este campo."
            variant="filled"
            name="correo"
            value={state.correo}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <TextField
            error={state.nacionalidad === ""}
            id="filled-error-helper-text"
            label="Nacionalidad"
            placeholder="Boliviano"
            helperText="llene este campo."
            variant="filled"
            name="nacionalidad"
            value={state.nacionalidad}
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <TextField
            error={state.ci === ""}
            id="filled-error-helper-text"
            label="Cedula de Identidad"
            placeholder="123456"
            helperText="llene este campo."
            variant="filled"
            name="ci"
            value={state.ci}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Fecha de nacimiento"
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
      </Box>

      <Stack
        spacing={2}
        direction="row"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
       {
         actualizar ? (
           <Button
             variant="contained"
             color="primary"
             onClick={() => {
              updateCliente();
             }}
           >
             Actualizar
           </Button>
         ) : (
           <Button
             variant="contained"
             color="primary"
             onClick={() => {
               guardar();
             }}
           >
             Guardar
           </Button>
         )
       }


      </Stack>
      <TransitionsSnackbar open={open} handleClose={handleClose} />

      <div className="contenedor" style={{ marginTop: "2rem" }}>
        <DataGrid rows={rows} setState={setState} setValue={setValue} setActualizar={setActualizar} setEliminar={setEliminar} />
      </div>
    </>
  );
}
