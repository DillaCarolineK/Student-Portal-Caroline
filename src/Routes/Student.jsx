// TODO: answer here
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { Select } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Heading } from "@chakra-ui/react";

const Student = () => {
    // TODO: answer here
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    const getData = async () => {
        try {
            const response = await fetch("http://localhost:3001/student");
            const data = await response.json();
            setData(data);
            setLoading(false);
        } 
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch('http://localhost:3001/student/' + id, {
                method: "DELETE",
            }); 
            getData();
        } 
        catch (error) {
            console.log(error);
        }
    }

    const handleFilterData = (e) => {
        setFilter(e.target.value);
    }

    const filterStudents = filter === "All" ? data : data.filter((e) => e.faculty === filter);

    return (
    <Container>
        <Heading marginBottom={5} marginTop={5} as="h3" color="teal">All Students</Heading>
        <Select value={filter} 
        onChange={handleFilterData} 
        data-testid="filter">
            <option value="All">All</option>
            <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
            <option value="Fakultas Ilmu Sosial dan Politik">Fakultas Ilmu Sosial dan Politik</option>
            <option value="Fakultas Teknik">Fakultas Teknik</option>
            <option value="Fakultas Teknologi Informasi dan Sains">Fakultas Teknologi Informasi dan Sains</option>
        </Select>

        {loading ?(
        <p>Loading ...</p>
        ):(
            <TableContainer>
                <Table id="table-student" variant='striped' colorScheme='teal'>
                    <TableCaption>Students Table</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>Full Name</Th>
                            <Th>Faculty</Th>
                            <Th>Program Study</Th>
                            <Th>Option</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {filterStudents.map((student, index) => (
                        <Tr className="student-data-row" key={student.id}>
                            <Td>{index + 1}</Td>
                            <Td>
                                <Link to={`/student/${student.id}`}>{student.fullname}</Link>
                            </Td>
                            <Td>{student.faculty}</Td>
                            <Td>{student.programStudy}</Td>
                            <Td>
                                <Button onClick={() => handleDelete(student.id)} data-testid={`delete-${student.id}`}>Delete</Button>
                            </Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>
            </TableContainer>
        )}
    </Container>
    );
};

export default Student