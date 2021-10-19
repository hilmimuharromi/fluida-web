import TableCard from '../base/TableCard'
import React, {useState} from 'react'
import Button from '@material-tailwind/react/Button'



function TableMateri() {
    const [search, onSearch] = useState('')
    const columns = [{
        title: 'Title',
        key: 'title',
    },
    {
        title: 'Content',
        key: 'content',
        render: (item) => (<Button>View Content</Button>)
    }, 
    {
        title: 'Action',
        key: 'content',
        render: (item) => (
        <div className="flex space-x-1">

        <Button>Edit</Button>
        <Button>Delete</Button>

        </div>
        )
    }, 
]

const data = [{
    title: 'Judul materi',
    content: '<p>content materi</p>'
}]
    return (
        <TableCard
        title={"Tabel Materi"} 
        actionTitle="New Materi"
        columns={columns} 
        data={[]}
        searchValue={search}
        onSearch={(data)=> onSearch(data)}
        />
    )
}

export default TableMateri
