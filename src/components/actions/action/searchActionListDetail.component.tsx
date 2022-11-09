import {Box, IconButton, Input, Stack} from "@mui/joy";
import {FC} from "react"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

/**
 * Search in action list component
 * @constructor
 */
const SearchActionListDetailComponent: FC = (): JSX.Element => {
    return (
        <Box
            sx={{
                mb: 2,
            }}
        >
            <Stack
                direction={'row'}
                spacing={0}
            >
                <Input
                    sx={{
                        borderTopRightRadius: 0,
                        borderTopLeftRadius: 4,
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 4,
                        flex: '1',
                        borderColor: 'neutral.100',
                        '&:hover': {
                            zIndex: 99,
                        }
                    }}
                />
                <IconButton
                    variant={'outlined'}
                    color={'neutral'}
                    sx={{
                        borderRadius: 0,
                        mx: '-1px',
                        borderColor: 'neutral.100',
                        '&:hover': {
                            zIndex: 99,
                        }
                    }}
                >
                    <SearchOutlinedIcon/>
                </IconButton>
                <IconButton
                    id="positioned-demo-button"
                    // aria-controls={open ? 'positioned-demo-menu' : undefined}
                    aria-haspopup="true"
                    // aria-expanded={open ? 'true' : undefined}
                    variant="outlined"
                    color="neutral"
                    // onClick={handleClick}
                    sx={{
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 4,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 4,
                        borderColor: 'neutral.100',
                        '&:hover': {
                            zIndex: 99,
                        }
                    }}
                >
                    <KeyboardArrowDownOutlinedIcon />
                </IconButton>
            </Stack>
        </Box>
    );
}
export default SearchActionListDetailComponent;