import React, { Component } from 'react';


import { Title, Badge } from '../../../components/Title/'
import { Paper } from '../../../components/Paper/';
import { Container, Text, Link } from '../../../components/CallToAction/';
import { Table } from '../../../components/cTable/';


export class Allregister extends Component {
  render() {
    return (
      <div>
        <Title>My registers<Badge>0</Badge></Title>
        <Paper>
          <Container>
              <Text>You haven`t created registers yet!</Text>
              <Link to='/registers/new'>create</Link>
          </Container>
        </Paper>

        <Title>All registers<Badge>4</Badge></Title>
        <Paper>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Current Valuation</th>
                <th>Total Valuations</th>
                <th>Entries</th>
                <th>Created</th>
                <th>Last update</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ololo</td>
                <td>0x2452f33</td>
                <td>1 ETH</td>
                <td>10 ETH</td>
                <td>32</td>
                <td>Oct 09 15:47</td>
                <td>Oct 09 15:47</td>
              </tr>
              <tr>
                <td>Ololo</td>
                <td>0x2452f33</td>
                <td>1 ETH</td>
                <td>10 ETH</td>
                <td>32</td>
                <td>Oct 09 15:47</td>
                <td>Oct 09 15:47</td>
              </tr>
              <tr>
                <td>Ololo</td>
                <td>0x2452f33</td>
                <td>1 ETH</td>
                <td>10 ETH</td>
                <td>32</td>
                <td>Oct 09 15:47</td>
                <td>Oct 09 15:47</td>
              </tr>
              <tr>
                <td>Ololo</td>
                <td>0x2452f33</td>
                <td>1 ETH</td>
                <td>10 ETH</td>
                <td>32</td>
                <td>Oct 09 15:47</td>
                <td>Oct 09 15:47</td>
              </tr>
            </tbody>
          </Table>
        </Paper>
      </div>
    );
  }
}


export default Allregister;

