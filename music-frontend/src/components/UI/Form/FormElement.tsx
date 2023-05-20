import { TextField, Grid } from "@mui/material";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface Props {
    value: string;
    label: string;
    name: string;
    onChange: ChangeEventHandler<HTMLInputElement>
    type?: HTMLInputTypeAttribute | 'select';
    id?: string;
    required?: boolean;
    error?: string;
    multiline?: boolean;
    rows?: number;
}

const FormElement = ({value, label, name, onChange, type, id, required = false, error, multiline, rows}: Props) => {
    return (
        <Grid item xs={12}>
            <TextField
                type={type}
                id={id}
                required
                value={value}
                onChange={onChange}
                name={name}
                variant='outlined'
                fullWidth
                label={label}
                error={!!error}
                helperText={error}
                multiline={multiline}
                rows={rows}
            />
        </Grid>
    )
}

export default FormElement;