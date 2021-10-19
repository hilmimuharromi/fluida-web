import Card from '@material-tailwind/react/Card';
import {CardHeader, Button, NavbarInput, CardBody} from '@material-tailwind/react';


export default function CardTable(props) {
    const {title, columns, data, actionTitle, onSearch,searchValue, onAction} = props

    const headerHandler = (item, index) => {
        if (item.hide) {
          return (
            <th key={index.toString()} scope="col" className="relative px-6 py-3">
              <span className="sr-only">{item.title}</span>
            </th>
          );
        } else {
          return (
            <th
              key={index.toString()}
              scope="col"
              className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left"
            >
              {item.title}
            </th>
          );
        }
      };

      const getData = (item, h) => {
        const keyData = h.key.split(".");
        if (keyData.length > 1) {
          const innerData = item[keyData[0]];
          return <>{innerData[keyData[1]]}</>;
        } else return <>{item[keyData[0]]}</>;
      };

      const rowHandler = (item, index) => {
        return (
          <tr key={index.toString()}>
            {columns.map((h, index) => {
              if (h.render)
                return (
                  <td key={index.toString()} className="px-6 py-4 whitespace-wrap">
                    {h.render(item)}
                  </td>
                );
              else
                return (
                  <td key={index.toString()} className="px-6 py-4 whitespace-wrap">
                    {getData(item, h)}
                  </td>
                );
            })}
          </tr>
        );
      };



    return (
        <Card>
            <CardHeader color="purple" contentPosition="between">
                <div className="flex justify-between">
                <h2 className="text-white text-2xl">{title}</h2>
                <div className="flex space-x-1">
                <NavbarInput 
                value={searchValue}
                onChange={(e) => onSearch(e.target.value)}/>
                {/* <Button>{actionTitle}</Button> */}
                </div>
                </div>
            </CardHeader>
            <CardBody>
                <div className="overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                {
                                   columns && columns.map((item, index) => headerHandler(item, index))
                                }
                                {/* <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Project
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Budget
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Status
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Users
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Completion
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                data && data.map((item, index) => rowHandler(item, index))
                            } */}

                            {!data || data.length === 0 ? <p>No Data </p> : data.map((item, index) => rowHandler(item, index))
                            
                            }
                            {/* <tr>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    Argon Design System
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    $2,500 USD
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{' '}
                                    pending
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <div className="flex">
                                        <div className="w-10 h-10 rounded-full border-2 border-white">
                                            <Image
                                                src={Team1}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team2}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team3}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team4}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                    </div>
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <Progress color="red" value="60" />
                                </th>
                            </tr>
                            <tr>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    Black Dashboard Sketch
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    $1,800 USD
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <i className="fas fa-circle fa-sm text-blue-gray-900 mr-2"></i>{' '}
                                    completed
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <div className="flex">
                                        <div className="w-10 h-10 rounded-full border-2 border-white">
                                            <Image
                                                src={Team1}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team2}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team3}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team4}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                    </div>
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <Progress color="green" value="100" />
                                </th>
                            </tr> */}
                            
                        </tbody>
                    </table>
                </div>
            </CardBody>
        </Card>
    );
}
