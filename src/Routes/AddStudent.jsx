import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    FormControl,
    FormLabel,
  } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Heading } from "@chakra-ui/react";

const AddStudent = () => {
    const [addData, setAddData] = useState({
        fullname: "",
        profilePicture: "",
        address: "",
        phoneNumber: "",
        birthDate: "",
        gender: "",
        programStudy: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        fetch("http://localhost:3001/student") 
        .then((response) => response.json())
        .then((data) => { 
            setAddData(data);
        })
        .catch((error) => {
            console.log(error);
        }
        );
    }, [id]);
    
    const handleChange = (e) => {
        setAddData((newData) => (
            {...newData, [e.target.name]: e.target.value,}
        ));
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
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { fullname, profilePicture, address, phoneNumber, birthDate, gender, programStudy } = addData;
        const faculty = getFaculty(programStudy);
        
        const newListStudent = {
            fullname: fullname,
            profilePicture: profilePicture,
            address: address,
            phoneNumber: phoneNumber, 
            birthDate: birthDate,
            gender: gender,
            faculty: faculty,
            programStudy: programStudy,
        };
        
        fetch("http://localhost:3001/student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newListStudent), 
        })
        .then((response) => response.json())
        .then(() => {
            navigate("/student");
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
            <form id="form-student" onSubmit={handleSubmit}>
                <Heading marginBottom={5} marginTop={5} as="h3" color="teal">Add Students</Heading>
                <img src={addData.profilePicture} alt="Profile" data-testid="previewPicture"/>
                <label>Full Name:
                    <Input data-testid="name"
                    type="text" 
                    name="fullname" 
                    value={addData.fullname} 
                    onChange={handleChange}/>
                </label>

                <label>Profile Picture:
                    <Input
                    data-testid="profilePicture"
                    type="text" 
                    name="profilePicture"
                    value={addData.profilePicture} 
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

                <label>Program Study
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
                data-testid="add-btn" colorScheme="teal" marginTop={4} marginBottom={5}>
                    Add Student
                </Button>
            </form>
        );
};

export default AddStudent;