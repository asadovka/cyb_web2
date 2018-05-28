import * as React from "react";
import withRouter from "react-router/es/withRouter";


const LatestBlocks = () => (
  <div>
<h2 className='title'>Latest blocks</h2>
        <table className='table is-striped is-fullwidth'>
          <thead>
            <tr>
              <th>Height</th>
              <th>Age</th>
              <th>Transactions</th>
              <th>Mined by</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href='#'>497558</a>
              </td>
              <td>
                5 minutes ago
              </td>
              <td>
                2540
              </td>
              <td>
                <a href='#'>AntMiner</a>
              </td>
              <td>
                972498
              </td>
            </tr>
            <tr>
              <td>
                <a href='#'>497558</a>
              </td>
              <td>
                5 minutes ago
              </td>
              <td>
                2540
              </td>
              <td>
                <a href='#'>AntMiner</a>
              </td>
              <td>
                972498
              </td>
            </tr>
            <tr>
              <td>
                <a href='#'>497558</a>
              </td>
              <td>
                5 minutes ago
              </td>
              <td>
                2540
              </td>
              <td>
                <a href='#'>AntMiner</a>
              </td>
              <td>
                972498
              </td>
            </tr>
          </tbody>
        </table>
  </div>
)

export default LatestBlocks;
