import { Box, Button } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { useStores } from '../../hooks';
import { SortType } from '../../types';


export const ResetButton = observer(() => {

    const[showButton, setShowButton] = useState<boolean>(false);
    const { store } = useStores();

    useEffect(() => {
        if(store.filterStore.activeFilters.size > 0 || store.dataStore.searchString !== "" || store.dataStore.sort.type !== SortType.NONE) {
            setShowButton(true);
        }
        else{
            setShowButton(false);
        }
        
    }, [store.filterStore.activeFilters.size, 
        store.dataStore.searchString.length,
        store.dataStore.sort.type,
    ]);


    const handleReset = () => {
        Array.from(store.filterStore.activeFilters).forEach((filter) => {
            store.filterStore.removeFilter(filter.name);
        })
        store.dataStore.setSearchString("");
        store.dataStore.setSort(SortType.NONE, true);
        store.dataStore.reloadData();
    }

    return (
        <div>
        {showButton && <Button variant='outlined' sx={{backgroundColor: "red", width: "10%", marginTop: 3, borderRadius: 3, height: '50%'}} onClick={handleReset}>
            Reset
        </Button>}
        </div>
    )
});