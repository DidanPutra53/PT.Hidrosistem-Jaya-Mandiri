import React, { Fragment, useEffect, useState } from 'react'
import { getUserDetails, clearErrors, updateUsers } from '../../actions/authAction'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MetaData from '../layout/MetaData'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { MenuItem, Select } from '@mui/material';
import { authConstants } from '../../constants/authConstants';

const UpdateUser = ({ history, match }) => {

    const roles = [
        'superadmin',
        'admin',
        'checker'
    ]

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [namapengguna, setNamapengguna] = useState("")
    const [role, setRole] = useState("")

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, user } = useSelector(state => state.userDetails)
    const { error: updateError, isUpdated } = useSelector(state => state.user)
    const userId = match.params.id

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setEmail(user.email)
            setUsername(user.username)
            setNamapengguna(user.namapengguna)
            setRole(user.role)
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            history.push('/User')
            alert.success('Updated User successfully')
            dispatch({
                type: authConstants.UPDATE_USER_RESET
            })
        }
    }, [dispatch, user, userId, error, alert, history, isUpdated, updateError]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email);
        formData.set('username', username);
        formData.set('namapengguna', namapengguna);
        formData.set('role', role);
        dispatch(updateUsers(user._id, formData));
    }

    return (
        <Fragment>
            <MetaData title={'Update User'} />
            <div className="content">
                <h2>Update User</h2>
                <form className="Tambah" encType='multipart/form-data' onSubmit={submitHandler}>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Email User
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Email User"
                            variant="standard"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Username User
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Username"
                            variant="standard"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Nama Pengguna User
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Nama Pengguna"
                            variant="standard"
                            value={namapengguna}
                            onChange={(e) => setNamapengguna(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Role
                        </label>
                        <FormControl
                            sx={{
                                minWidth: 100
                            }}
                            variant="standard">
                            <InputLabel htmlFor="demo-customized-select-native">Kategori</InputLabel>
                            <Select
                                defaultValue=""
                                id="demo-customized-select-native"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                {
                                    roles.map(role => (
                                        <MenuItem key={role} value={role}>{role}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="button">
                        <Button
                            type='submit'
                            variant="contained"
                        >
                            Ubah
                        </Button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default UpdateUser
