import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import '../../App.css'

const Content = () => {
  const { t } = useTranslation()
  return (
    <AppHeader>
      <div className="w-full h-full flex justify-center items-center flex-col gap-6">
        <h1>{t('welcome.title')}</h1>
        <p>{t('welcome.redirect')}</p>
      </div>
    </AppHeader>
  )
}

export default Content

const AppHeader = styled.main.attrs({
  className:
    'flex flex-column items-center justify-center text-white min-h-[inherit]',
})`
  background-color: #282c34;
  font-size: calc(10px + 2vmin);
`
