// @flow
import React,{ forwardRef }  from "react";
import MaterialTable, {MTableHeader} from 'material-table'
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {GET_TRANS_LANG} from "../../lib/common";
import { makeStyles, useTheme} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import Select from 'react-select'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import InputAdornment from '@material-ui/core/InputAdornment';

import TablePagination from '@material-ui/core/TablePagination';
import { Map } from 'immutable';
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const customStyles = {
    container: styles => ({ ...styles }),
    menu: styles => ({ ...styles ,zIndex:100}),

}


type Props={
    TableQuery:Map<{ [string]: string }>,
    SetTableQuery:(state:Map)=>Function,
    columns:{ [string]: string },
    SearchOptions: Array< { [string]: string }>,
    GetSearchData:()=>Function,

}
export const PigletTable = (props:Props)=>{


    function changeRowPerPage(event){

        let new_state = props.TableQuery.set('row_per_page',parseInt(event.target.value, 10)).set('cur_page',0)
        props.SetTableQuery(new_state)
    }
    function changePage(page){

        let new_state = props.TableQuery.set('cur_page',page)
        props.SetTableQuery(new_state)
    }

    function orderChange(col_id,order_dir){

        let new_state = props.TableQuery.set('sort',col_id).set('order',order_dir).set('sort_col',props.columns[col_id].field)
        props.SetTableQuery(new_state)
    }


    function changeSearchValue(event){


        let new_state = props.TableQuery.set('search_val',event.target.value)

        props.SetTableQuery(new_state)

    }

    function changeSearchCol(select){

        let new_state=null
        if(select){
            new_state = props.TableQuery.set('search_col',select.value)
        }
        else
            new_state = props.TableQuery.set('search_col','')

        props.SetTableQuery(new_state)
    }


    const sort = props.TableQuery.get('sort');
    const order_dir=props.TableQuery.get('order');


    return(
        <div>
            <SearchBar  SearchOptions={props.SearchOptions}
                        GetSearchData={ props.GetSearchData}
                        ChangeSearchValue={changeSearchValue}
                        ChangeSearchCol={changeSearchCol}
                        TableQuery={props.TableQuery}/>
            <MaterialTable
                icons={tableIcons}
                title=''
                components={
                    {
                        OverlayLoading: ()=>(
                            <div></div>
                        ),
                        Header: (props) => (
                            <MTableHeader {...props} onOrderChange={orderChange} orderBy={sort} orderDirection={order_dir} />
                        ),
                        Pagination: () => (
                            <TablePagination
                                rowsPerPageOptions={[10, 20, 30, 40, 50]}
                                count={props.TableQuery.get('total_cnt')}
                                rowsPerPage={props.TableQuery.get('row_per_page')}
                                page={props.TableQuery.get('cur_page')}
                                onChangePage={changePage}
                                onChangeRowsPerPage={changeRowPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        ),
                        // Toolbar: (props)=><NewBar props={props}  SearchOptions={options}/>
                    }}
                localization={{
                    body:{
                        emptyDataSourceMessage:GET_TRANS_LANG("NO_RECORD"),
                        editTooltip:GET_TRANS_LANG("EDIT"),
                        deleteTooltip:GET_TRANS_LANG("DELETE"),
                        editRow:{
                            saveTooltip:GET_TRANS_LANG("SAVE"),
                            cancelTooltip:GET_TRANS_LANG("CANCEL"),
                            deleteText:GET_TRANS_LANG('DELETE_CONFIRM')
                        },
                        addTooltip:GET_TRANS_LANG("ADD"),


                    },
                    header:{
                        actions:GET_TRANS_LANG('ACTIONS')
                    }
                }}
                options={{
                    actionsColumnIndex: -1,
                    showTitle:false,
                    sorting: true,
                    search:false,
                    pageSizeOptions:[10, 20, 30, 40, 50],
                    pageSize:props.TableQuery.get('row_per_page')
                }}
                {...props}
            />
        </div>
    )
}

const SearchBar= (props)=>{

    function handleKeyPress(e){

        if(e.key === 'Enter')
            props.GetSearchData()
    }
    return(

        <div style={{position:'absolute',width:'100%',margin:10}}>
            <Grid justify="flex-start"
                  alignItems="center"
                  container spacing={2}>


                <Grid item xs={2} style={{margin: 'auto 0',zIndex:1000}}>
                    <Select
                        styles={customStyles}
                        placeholder={GET_TRANS_LANG('COLUMN')}
                        options={props.SearchOptions}
                        value={props.TableQuery.get('search_col')!=null && props.SearchOptions.filter(option=>{
                            return option.value==props.TableQuery.get('search_col')
                        })}
                        isClearable={true}
                        onChange={props.ChangeSearchCol}
                    />
                </Grid>
                <Grid item xs={3}  style={{margin: 'auto 0',zIndex:1000}}>
                    <TextField
                        label={GET_TRANS_LANG('SEARCH')}
                        autoComplete="off"
                        fullWidth
                        margin="dense"
                        value={props.TableQuery.get('search_val')}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onKeyPress={(e) => handleKeyPress(e)}
                        onChange={props.ChangeSearchValue}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={props.GetSearchData} >
                                        <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>


                            )
                        }}/>
                </Grid>

            </Grid>

        </div>


    )

}



const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2.5),
    },
}));


export function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    function handleFirstPageButtonClick() {
        onChangePage( 0);
    }

    function handleBackButtonClick() {
        onChangePage(page - 1);
    }

    function handleNextButtonClick() {
        onChangePage( page + 1);
    }

    function handleLastPageButtonClick() {
        onChangePage( Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}




