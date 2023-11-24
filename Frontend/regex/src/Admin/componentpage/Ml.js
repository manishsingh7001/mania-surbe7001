import React,{useEffect,useState} from 'react'
import Sidenav from '../Sidenav';
import Navbar from './Navbar';
import { Box } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Ml = () => {
    const [getuserdata, setUserdata] = useState([]);

    const getdata = async (e) => {
        const res = await fetch("http://localhost:5000/getdata", {
            method: 'get',

            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json()

      
     
   

        let data4 = data.filter((item)=>{

            return item.courses == 'ml'

        })

        console.log(data4)

       

        if (res.status === 404 || !data) {

            console.log("error");
        }
        else {
            setUserdata(data4)

        }
    }
    useEffect(()=>{
        getdata();
    },[])
  return (
    <>
         <Navbar />

<Box sx={{ display: 'flex' }}>
    <Sidenav />

    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1 className='heading'>Machhine learning</h1>
        <table class="table">
            <thead>
                <tr class="table-dark">
                    <th scope="col">S.No</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Course</th>
                    
                    <th scope="col" className='th'>Edit</th>


                </tr>
            </thead>
            <tbody>
                {
                    getuserdata.map((element, id) => {
                        return (
                            <>
                                <tr>
                                    <th scope="row">{id + 1}</th>
                                    <td>{element.firstname}</td>
                                    <td>{element.lastname}</td>
                                    <td>{element.email}</td>
                                    <td>{element.contactnumber}</td>
                                    <td>{element.courses}</td>
                                    <td className="d-flex justify-content-between" >

                                        <button className='btn btn-success'><RemoveRedEyeIcon /></button>



                                        <button className='btn btn-primary'><EditIcon /></button>
                                        <button className='btn btn-danger'><DeleteIcon /></button>
                                    </td>
                                </tr>
                            </>
                        )
                    })
                }


            </tbody>
        </table>
    </Box>
</Box>
    </>
  )
}

export default Ml
