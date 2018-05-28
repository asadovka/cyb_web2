import * as React from "react";
import withRouter from "react-router/es/withRouter";


const Mempool = () => (
  <div>
  <h2 className='title'>Mempool</h2>
        <table className='table is-striped is-fullwidth'>
          <thead>
            <tr>
              <th>Hash</th>
              <th>Value Out</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href='#'>4b81781bc3dae3729010973e94d632a18ed42ac714085a97efa4a79b92dd6d4b</a>
              </td>
              <td>
                0.001470793650793651 BTC
              </td>
            </tr>
            <tr>
              <td>
                <a className='is-link' href='#'>4b81781bc3dae3729010973e94d632a18ed42ac714085a97efa4a79b92dd6d4b</a>
              </td>
              <td>
                0.001470793650793651 BTC
              </td>
            </tr>
            <tr>
              <td>
                <a href='#'>4b81781bc3dae3729010973e94d632a18ed42ac714085a97efa4a79b92dd6d4b</a>
              </td>
              <td>
                0.001470793650793651 BTC
              </td>
            </tr>
          </tbody>
        </table>
  </div>
)

export default Mempool;
