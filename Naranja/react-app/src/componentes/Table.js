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

    const [contenido,setDatos] = useState(
        {'contenido':[{
            "humano": "",
            "comentario":"",
            "fecha":"",
            "id": "",
            "up": 0,
            "down": 0
        }]}
    );
    
     useEffect(()=>{
        socket.on('contenido',contenido =>{
           setDatos(contenido) 
        });
    },[contenido]);

  const [hashs,setHash] = useState("");
    useEffect(()=>{
      socket.on('hashs',hashs =>{
        setHash(hashs) 
      });
  },[hashs]);
  var hashss = ""

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
      <>{
        console.log('salida de hash'),
        console.log(hashs)
      }
      { contenido.contenido.slice(0).map((e)=>{
        hashss = " "
       hashss = 
       (hashs === "" ? " " : (hashs.hashs.map((h)=>{
          return(
          e.id === h.id_noti_tweet) ? (hashss + h.hashtag + " " ) : " "      
     })))
     
        
                    return(

                        rows.push(createData(e.humano,e.fecha,e.comentario,hashss,e.down,e.up)),
                        console.log(hashss) , console.log("cada hasssh") 
                    )
                })
                }
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Country
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
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
                 
                
            console.log(rows),console.log("el rows"),
            
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
