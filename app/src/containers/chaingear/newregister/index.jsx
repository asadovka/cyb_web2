import React, { Component } from 'react';

import { Title } from '../../../components/Title/'

import { 
  Container, SideBar, Content,
  Label,
  Panel,
  Code,
  Control,
  TotalCost,
  CreateButton,
  FieldsTable
} from '../../../components/chaingear/';

export class Newregister extends Component {
  render() {
    return (
      <div>
        <Title>New registry creation</Title>
        <Container>
          <SideBar>
            <Label>Input</Label>
            <Panel title='General Parameters'>
              <Control title='name:'>
                <input />
              </Control>
              <Control title='description:'>
                <input />
              </Control>
              <Control title='tags:'>
                <input />
              </Control>
              <Control title='permission'>
                <input />
              </Control>
              <Control title='entry fee:'>
                <input />
              </Control>
            </Panel>
            <Panel title='Record Structure'>
              <FieldsTable>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Header1</td>
                    <td>string</td>
                    <td><button>remove</button></td>
                  </tr>
                  <tr>
                    <td><input /></td>
                    <td>
                      <select>
                        <option>string</option>
                      </select>
                    </td>
                    <td><button>add</button></td>
                  </tr>
                </tbody>
              </FieldsTable>
              <TotalCost value={34335656}/>
              <CreateButton>create registry</CreateButton>
            </Panel>
          </SideBar>
          <Content>
            <Label color="#3fb990">Output</Label>
            <Code>
              code
            </Code>
          </Content>
        </Container>
      </div>
    );
  }
}


export default Newregister;

