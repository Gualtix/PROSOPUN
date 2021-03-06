import React,{useEffect,useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import socket from './Socket';
const columns = [
  { id: 'name', label: 'Nombre', minWidth: 100 },
  { id: 'code', label: 'Fecha', minWidth: 100 },
  { id: 'population', label: 'Mensajes', minWidth: 200 },
  { id: 'size', label: 'HashTags', minWidth: 100 },
  { id: 'down', label: 'DownVotes', minWidth: 70 },
  { id: 'up', label: 'UpVotes', minWidth: 70 },
];

function createData(name, code, population, size, up, down) {
  
  return { name, code, population, size, up, down};
}



export default function ColumnGroupingTable() {
    const rows = [];
   
   
    const [AzureE,setAzureE] = useState( "");
     useEffect(()=>{
         
        socket.on('azuC',ac1 =>{
            setAzureE(ac1) 
        })
    },[])//aqui tenia [ReEnvio]

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  return (
      <>
        {
            console.log('salida en azure'),
            console.log(AzureE)
        }
      
      {
         AzureE === "" ? "" : ( AzureE.data.slice(0).map((e)=>(
            <>
                {
                (rows.push(createData(e.nombre,e.fecha,e.comentario,e.hashtags,e.upvotes,e.downvotes)) === "" ? " ":" ")
                }
            </>
         )))
      }
        {/*  contenido.contenido.slice(0).map((e)=>(
        <>
        {
          fecha = new Date(e.fecha),
          numero = fecha.getMonth() + 1,
        
                    //return(
                  <small>
                        {(rows.push(createData(e.humano,fecha.getDate() + "/" + numero+ "/" + fecha.getFullYear(),e.comentario,hashss,e.down,e.up)) === "" ? " ":" ")}
                        </small>
                        //console.log(hashss) , console.log("cada hasssh") 
                    }
                </>))
                */ }
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={6}>
                <b><h2> Resultado total de Registos en la base de datos</h2> </b>
              </TableCell>
              {/*<TableCell align="center" colSpan={3}>
                Details
              </TableCell>*/}
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}

            </TableRow>
            
          </TableHead>
          
          <TableBody>
            {
                 
                
            //console.log(rows),console.log("el rows"),
            
            rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}
