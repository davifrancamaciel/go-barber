import React, {forwardRef} from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Container, TInput} from './styles'

function Input ({styles, icon, ...rest}, ref) {
  return (
    <Container styles={styles}>
      {icon && <Icon name={icon} size={20} color='#fff' />}
      <TInput {...rest} ref={ref} />
    </Container>
  )
}

Input.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

Input.defaultProps = {
  icon: null,
  style: {},
}

export default forwardRef(Input)
