import React, { Component } from 'react';

import { Title } from '../../../components/Title/'
import { browserHistory } from 'react-router'

import { 
  Container, SideBar, Content,
  Label,
  Panel,
  Control,
  TotalCost,
  CreateButton,
  FieldsTable
} from '../../../components/chaingear/';

import Code from '../../../components/SolidityHighlight/';

import { chaingear } from 'cyber-search-js';
import AddField from './AddField';

const MAX_FIELD_COUNT = 10;

let compiler;
let bytecode;
let abi;

export class Newregister extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
        fields: [
        { name: 'name', type: 'string' }, 
        { name: 'ticker', type: 'string' }
      ],
      status: '',
      inProgress: false,
      contractName: 'Tokens',
      contracts: [],
      gasEstimate: null,
      error: null
    }
  }

  componentDidMount() {    
    chaingear.getRegistry()
      .then(contracts => this.setState({ contracts }));

    this.setState({ status: 'load compiler...', inProgress : true });
    chaingear.loadCompiler((_compiler) => {
      compiler = _compiler;

      this.setState({ status: null, inProgress : false })      
    })
  }

  remove = (name) => {
    this.setState({
      fields: this.state.fields.filter(x => x.name !== name)
    }, () => this.compileAndEstimateGas())
  }

  create = () => {
    
    this.compileAndEstimateGas((web3) => {
      const { contractName, gasEstimate } = this.state;
      this.setState({ status: 'deploy contract...', inProgress: true });

      const opt = {
        gasEstimate,
        contractName,
        permissionType: +this.refs.permission.value,
        entryCreationFee: +this.refs.entryCreationFee.value,
        description: this.refs.description.value,
        tags: this.refs.tags.value
      };
      let address;
      chaingear.deployRegistry(bytecode, abi, web3, opt)
        .then((_address) => {
          address = _address;
          this.setState({ status: 'save abi in ipfs...'});
          return chaingear.saveInIPFS(abi);
        })
        .then(hash => {
          this.setState({ status: 'register contract...'});
          return chaingear.register(contractName, address, hash);
        })
        .then(() => {
          this.setState({ status: '', inProgress: false });
          browserHistory.push(`/registers`);
        })
        .catch(err => {
          this.setState({
            error: err,
            inProgress: false
          })
        })
    });
  }

  add = (name, type) => {
    const newItem = {
      name,
      type
    };
    this.setState({
      fields: this.state.fields.concat(newItem)
    }, () => this.compileAndEstimateGas());
  }

  compileAndEstimateGas = (cb) => {
    const { contractName, fields } = this.state;
    const code = chaingear.generateContractCode(contractName, fields);

    this.setState({ status: 'compile...', inProgress: true });
    chaingear.compileRegistry(code, contractName, compiler)
      .then((data) => {
        bytecode = data.bytecode;
        abi = data.abi;
        this.setState({ status: 'estimate gas...'});
        return data;
      })
      .then(() => chaingear.estimateNewRegistryGas(bytecode))
      .then(({ web3, gasEstimate }) => {
        this.setState({
          gasEstimate: gasEstimate + 1000000,//bug with web3, incorrect estimate
          inProgress: false,
          error: null
        }, () => {
          if (cb) cb(web3);  
        })
      })
      .catch(error => {
        this.setState({
          inProgress: false,
          error
        })
      })
  }

  changeContractName = (e) => {
    this.setState({
      contractName: e.target.value
    })
  }

  render() {
    const { contractName, fields, status, inProgress, contracts, gasEstimate, error } = this.state;
    const code = chaingear.generateContractCode(contractName, fields);
    const exist = !!contracts.find(x => x.name === contractName)
    const fieldsCount = fields.length;
    const canDeploy = contractName.length > 0 && fieldsCount > 0 && fieldsCount <= MAX_FIELD_COUNT && !exist;

    return (
      <div className='container' style={{ width: 1090 }}>
        <Title>New registry creation</Title>
        <Container>
          <SideBar>
            <Label>Input</Label>
            <Panel title='General Parameters'>
              <Control title='name:'>
                <input 
                placeholder='name'
                value={contractName}
                onChange={this.changeContractName}
              />
              </Control>
              <Control title='description:'>
                <input 
                placeholder='description'
                ref='description'
              />
              </Control>
              <Control title='tags:'>
                <input 
                placeholder='tags'
                ref='tags'
              />
              </Control>
              <Control title='permission'>
                <select ref='permission'>
                  <option value='1'>OnlyOwner</option>
                  <option value='2'>AllUsers</option>
                  <option value='3'>Whitelist</option>
                </select>
              </Control>
              <Control title='entry fee:'>
                <input 
                  ref='entryCreationFee'
                  defaultValue='0.1'
                />
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
                  {fields.map(field => (
                    <tr key={field.name}>
                      <td>{field.name}</td>
                      <td>{field.type}</td>
                      <td>
                        <button 
                          onClick={() => this.remove(field.name)}
                        >remove</button>
                      </td>
                    </tr>
                  ))}
                  <AddField
                    onAdd={this.add}
                    fields={fields}
                  />
                </tbody>
              </FieldsTable>
              <TotalCost value={gasEstimate}/>
              <CreateButton onClick={this.create} disabled={!canDeploy}>create registry</CreateButton>
            </Panel>
          </SideBar>
          <Content>
            <Label color="#3fb990">Output {error || status}</Label>
            <Code>
              {code}
            </Code>
          </Content>
        </Container>
      </div>
    );
  }
}


export default Newregister;

