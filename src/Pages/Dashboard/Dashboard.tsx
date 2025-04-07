import { useEffect } from 'react';
import ShellContainer from '../../Containers/ShellContainer';
import { useAppDispatch, useAppSelector } from '../../redux/store/hook';
import Card from '../../Shared/Card/Card'
import { fetchDashboardData } from '../../redux/slice/DashboardSlice/DashboardSlice';

interface ContentItemProps {
  type: string;
  title: string;
  author: string;
  likes: number;
  image: string;
}

interface StateItemProps {
  title: string;
  value: string;
}

const ContentItem: React.FC<ContentItemProps> = ({ type, title, author, likes, image }) => {
  return (
    <Card styleClass={'p-3'}>
      {/* Hikayat Item */}
      <div className="flex items-center justify-between pb-4">
        <div className='flex flex-col space-y-2'>
          <p className="text-sm text-gray-500">{type}</p>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-500">{author}</p>
          <p className="text-sm text-red-500 flex items-center">
            ❤️ {likes}
          </p>
        </div>
        <img
          src={image}
          alt="Hikayat"
          className="w-36 h-24 rounded-lg object-cover"
        />
      </div>
    </Card>
  )
}

const StateItem: React.FC<StateItemProps> = ({ title, value }) => {
  return (
    <Card styleClass={'p-3'}>
      <div className="bg-white p-4 rounded-lg shadow-md text-center flex flex-col w-60 space-y-10">
        <h2 className="text-4xl font-semibold text-left">{title}</h2>
        <p className="text-5xl text-gray-400 font-semibold text-right">{value}</p>
      </div>
    </Card>
  );

}

function Dashboard() {
  // const dispatch =  useAppDispatch();
  const dispatch = useAppDispatch();
  const { contentItems ,stats} = useAppSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);
  
  return (
    <ShellContainer styleClass="">
      <div className="p-6 bg-gray-100 ml-60 flex-1">
        {/* Statistics Section */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {
            stats?.map((item: { title: string; value: string }) => (
              <StateItem
                key={item.title}
                title={item.title}
                value={item.value}
              />
            ))}
        </div>

        {/* Most Liked Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Most Liked</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="space-y-4">
              {
                contentItems.map((item) => (
                  <ContentItem
                    key={item.id}
                    type={item.type}
                    title={item.title}
                    author={item.author}
                    likes={item.likes}
                    image={item.image}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </ShellContainer>
  );
}

export default Dashboard;