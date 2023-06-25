import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    FormControl,
    FormLabel,
  } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Container } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

const EditStudent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const [addData, setAddData] = useState({
        fullname: "",
        profilePicture: "",
        address: "",
        phoneNumber: "",
        birthDate: "",
        gender: "",
        programStudy: "",
    });
    
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3001/student/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setAddData(data);
            setLoading(false);
        }
        );
    }, [id]);
    
    const handleChange = (e) => {
        setAddData({ ...addData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const { fullname, profilePicture, address, phoneNumber, birthDate, gender, programStudy } = addData;
        const faculty = getFaculty(programStudy);

        const newListStudent = {
            fullname,
            profilePicture,
            address,
            phoneNumber, 
            birthDate,
            gender,
            faculty,
            programStudy,
        };
        
        fetch(`http://localhost:3001/student/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },            
            body: JSON.stringify(newListStudent),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            navigate("/student");
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        });
    };
    
    const getFaculty = (programStudy) => {
        if(programStudy === 'Ekonomi' || 'Manajemen' || 'Akuntansi'){
            return 'Fakultas Ekonomi'
        }
        else if(programStudy === 'Administrasi Publik' || 'Administrasi Bisnis' || 'Hubungan Internasional'){
            return 'Fakultas Ilmu Sosial dan Politik'
        }
        else if(programStudy === 'Teknik Sipil' || 'Arsitektur'){
            return 'Fakultas Teknik'
        }
        else if(programStudy === 'Matematika' || 'Fisika' || 'Informatika'){
            return 'Fakultas Teknologi Informasi dan Sains'
        }
        else{
            return ' '
        }
    };

return (
        <form onSubmit={handleSubmit}>
            {loading ? (
            <p>Loading ...</p>
            ):(
                <Container>
                    <Heading marginBottom={5} marginTop={5} as="h3" color="teal">Edit Students</Heading>
                    
                    <img src={addData.profilePicture} alt="Profile" data-testid="previewPicture"/>
                    
                    <label>Full Name:
                        <Input data-testid="name"
                        type="text"
                        name="fullname" 
                        value={addData.fullname}
                        onChange={handleChange}/>
                    </label>

                    <label>Address:
                        <Input data-testid="address"
                        type="text"
                        name="address"
                        value={addData.address}
                        onChange={handleChange}/>
                    </label>

                    <label>Phone Number:
                        <Input data-testid="phoneNumber"
                        type="text"
                        name="phoneNumber" 
                        value={addData.phoneNumber} 
                        onChange={handleChange}/>
                    </label>

                    <label>Birth Date:
                        <Input data-testid="date"
                        type="date"
                        name="birthDate" 
                        value={addData.birthDate} 
                        onChange={handleChange}/>
                    </label>

                    <label>Gender:
                        <Select name="gender"
                        data-testid="gender"
                        value={addData.gender} 
                        onChange={handleChange} required>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Select>
                    </label>

                    <label htmlFor="input-prody">Program Study
                        <Select name="programStudy" 
                        data-testid="prody"
                        value={addData.programStudy} 
                        onChange={handleChange} required>
                            <option value="Ekonomi">Ekonomi</option>
                            <option value="Manajemen">Manajemen</option>
                            <option value="Akuntansi">Akuntansi</option>
                            <option value="Administrasi Publik">Administrasi Publik</option>
                            <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                            <option value="Hubungan Internasional">Hubungan Internasional</option>
                            <option value="Teknik Sipil">Teknik Sipil</option>
                            <option value="Arsitektur">Arsitektur</option>
                            <option value="Matematika">Matematika</option>
                            <option value="Fisika">Fisika</option>
                            <option value="Informatika">Informatika</option>
                        </Select>  
                </label>

                <Button type="submit"
                data-testid="edit-btn"
                id="edit-btn" colorScheme="teal" marginTop={4} marginBottom={5}>
                    Edit Student
                </Button>

            </Container>
            )}
        </form>
    );
};

export default EditStudent;