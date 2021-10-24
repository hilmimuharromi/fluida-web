import StatusCard from 'components/base/StatusCard';
// import ChartLine from 'components/base/ChartLine';
// import ChartBar from 'components/base/ChartBar';
// import PageVisitsCard from 'components/base/PageVisitsCard';
// import TrafficCard from 'components/base/TrafficCard';
import { useSelector } from 'react-redux';
export default function Dashboard() {
    const listMateri = useSelector((state) => state.materi.data)
    const listPraktikum = useSelector((state) => state.praktikum.data)
    const listTugasProyek = useSelector((state) => state.tugasProyek.data)
    const listSoalLatihan = useSelector((state) => state.soalLatihan.data)



    return (
        <>
           

            {/* <div className="px-3 md:px-8 -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            <ChartLine />
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <ChartBar />
                        </div>
                    </div>
                </div>
            </div> */}

            {/* <div className="bg-light-blue-500 px-3 md:px-8 h-40" /> */}
            <div className="px-3 md:px-8 mt-10">
                <div className="container mx-auto max-w-full min-h-screen">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                        <StatusCard
                            color="pink"
                            icon="trending_up"
                            title="Nateri"
                            amount={listMateri.length}
                            // percentage="3.48"
                            // percentageIcon="arrow_upward"
                            // percentageColor="green"
                            // date="Since last month"
                        />
                        <StatusCard
                            color="orange"
                            icon="groups"
                            title="Praktikum"
                            amount={listPraktikum.length}
                            // percentage="3.48"
                            // percentageIcon="arrow_downward"
                            // percentageColor="red"
                            // date="Since last week"
                        />
                        <StatusCard
                            color="purple"
                            icon="paid"
                            title="Tugas Proyek"
                            amount={listTugasProyek.length}
                            // percentage="1.10"
                            // percentageIcon="arrow_downward"
                            // percentageColor="orange"
                            // date="Since yesterday"
                        />
                        <StatusCard
                            color="blue"
                            icon="poll"
                            title="Soal Latihan"
                            amount={listSoalLatihan.length}
                            // percentage="12"
                            // percentageIcon="arrow_upward"
                            // percentageColor="green"
                            // date="Since last month"
                        />
                    </div>
                </div>
            </div>

            {/* <div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            <PageVisitsCard />
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <TrafficCard />
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}
