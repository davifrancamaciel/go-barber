import styled from 'styled-components'

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  margin-bottom:10px;
`

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.1)',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #fff;
`