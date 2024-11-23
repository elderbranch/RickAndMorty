import { Input, Select } from 'antd';
import s from './FilterCharacters.module.scss'
import { SearchOutlined } from '@ant-design/icons';

const FilterCharacters = ({ setAliveStatus, setGenderFilter, setSpecies, setCharName, }) => {

  return (
    <div className={s.filter__cont}>
      <Input
        className={s.filter}
        placeholder='Name'
        onChange={(e) => setCharName(e.target.value)}
        prefix={<SearchOutlined />}
        style={{
          height: 56,
        }}

      />
      <Select onChange={setSpecies}
        className={s.filter}
        defaultValue=''
        style={{
          height: 56,
        }}
        options={[{
          value: '',
          label: 'All Species',
        }, {
          value: 'Human',
          label: 'Human',
        },
        {
          value: 'Alien',
          label: 'Alien',
        },
        ]}
      />
      <Select onChange={setGenderFilter}
        className={s.filter}
        defaultValue=''
        style={{
          height: 56,
        }}
        options={[{
          value: '',
          label: 'All Genders',
        }, {
          value: 'male',
          label: 'Male',
        }, {
          value: 'female',
          label: 'Female',
        }, {
          value: 'genderless',
          label: 'Genderless',
        }, {
          value: 'unknown',
          label: 'Unknown',
        },
        ]}
      />
      <Select onChange={setAliveStatus}
        className={s.filter}

        defaultValue=''
        style={{
          height: 56,
        }}
        options={[{
          value: '',
          label: 'All status',
        }, {
          value: 'alive',
          label: 'Alive',
        }, {
          value: 'dead',
          label: 'Dead',
        }, {
          value: 'unknown',
          label: 'Unknown',
        },
        ]} />
    </div>
  )
}

export default FilterCharacters;