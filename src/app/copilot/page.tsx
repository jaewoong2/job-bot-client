'use client'
import React, { useCallback, useEffect, useState } from 'react'
import TextArea from '@/components/atoms/TextArea'
import useDebounce from '@/hooks/useDebounce'
import { AddIcon, InfoIcon, QuestionIcon } from '@chakra-ui/icons'
import { Icon, Input, Tag, TagLabel, TagLeftIcon, Text } from '@chakra-ui/react'
import { FcDislike, FcLike } from 'react-icons/fc'
import useCopilot, { LABEL, LIMIT_TEXT_LENGTH, MINIMUM_TEXT_LENGTH, PLACEHOLDER, TOOLTIP } from './hooks/useCopilot'
import useTemperature from '@/hooks/useTemperature'

const CopilotMain = () => {
  const {
    content,
    errorMessage,
    handleChangeContent,
    handleChangePosition,
    handleChangeTitle,
    position,
    setContent,
    setMessage,
    title,
    copilot,
    trigger: mutate,
    reset,
    isLoading,
  } = useCopilot()

  const { temperature } = useTemperature()
  const [isActive, setIsActive] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const debounceValue = useDebounce(content, 4000)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsEditing(true)
    handleChangeContent(e)
  }, [])

  const handleAddCopliot = useCallback(() => {
    if (copilot) {
      setContent((prev) => prev + copilot)
    }
    reset()
  }, [copilot])

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      if (copilot) {
        setContent((prev) => prev + copilot)
      }
      reset()
    } else {
      reset()
    }
  }

  useEffect(() => {
    if (debounceValue === content) {
      if (isEditing && isActive && position && title && content) {
        if (content.length > LIMIT_TEXT_LENGTH) {
          setMessage(`최대 ${LIMIT_TEXT_LENGTH}자 까지만 작성 가능 해요 🥲`)
          return
        }

        if (content.length < MINIMUM_TEXT_LENGTH) {
          setMessage(`${MINIMUM_TEXT_LENGTH - content.length}자 더 작성 부탁 드려요`)
          return
        }

        setMessage(null)
        mutate({ content, position, title, temperature })
        setIsEditing(false)
      }
    }
  }, [debounceValue, content, title, position, isActive, isEditing, temperature, setMessage, mutate])

  return (
    <form id='feedback-form'>
      <div className='w-full px-6 pt-3 text-sm'>
        <div className='flex flex-col gap-2'>
          <div className='flex w-full flex-col gap-2'>
            <Text className='flex items-center gap-1 whitespace-nowrap'>
              <QuestionIcon />
              지원서의 질문의 내용을 작성해주세요.
            </Text>
            <Input
              value={title}
              onChange={handleChangeTitle}
              className='text-sm'
              fontSize='sm'
              borderColor='gray.300'
              placeholder='직무와 관련된 지원자의 역량과 직무에 대한 관심과 노력에 대해 기술해 주세요.'
              _dark={{ borderColor: 'gray.500' }}
            />
          </div>
          <div className='flex w-full flex-col gap-2'>
            <Text className='flex items-center gap-1 whitespace-nowrap'>
              <QuestionIcon />
              어떤 직무의 지원서 인가요?
            </Text>
            <Input
              value={position}
              onChange={handleChangePosition}
              className='text-sm'
              fontSize='sm'
              borderColor='gray.300'
              placeholder='마케터, 인사담당자, 개발자'
              _dark={{ borderColor: 'gray.500' }}
            />
          </div>
        </div>
      </div>
      <div className='p-3 pb-0'>
        <div className='flex w-full flex-col items-end gap-2 px-3'>
          <button
            type='button'
            onClick={() => setIsActive((prev) => !prev)}
            className='cursor-pointer rounded-xl p-3 shadow-xl dark:shadow-inner dark:shadow-darkBg-200'
          >
            <Icon as={isActive ? FcLike : FcDislike} />
          </button>
          <span className='flex items-center gap-2 text-xs text-gray-400'>
            <InfoIcon />봇 {!isActive ? '정지' : '실행 중'}
          </span>
        </div>
        <TextArea
          isLoading={isLoading}
          label={LABEL}
          placeholder={PLACEHOLDER}
          resize='none'
          minH='400px'
          borderColor={errorMessage ? 'red.300' : 'gray.300'}
          _dark={{
            borderColor: errorMessage ? 'red.300' : 'gray.500',
          }}
          tooltip={TOOLTIP}
          isDisabled={isLoading}
          value={content}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          className='relative'
        />
        {copilot && (
          <div className='px-3'>
            <Tag size='md' key='md' variant='subtle' cursor='pointer' className='p-2' onClick={handleAddCopliot}>
              <TagLeftIcon boxSize='12px' as={AddIcon} />
              <TagLabel>{copilot}</TagLabel>
            </Tag>
          </div>
        )}
        <div className={`flex w-full justify-between px-3 text-sm ${errorMessage ? 'text-red-400' : 'text-gray-500'}`}>
          <div>{errorMessage && <span className='animate-fade-in-left text-red-500'>{errorMessage}</span>}</div>
          <div className={content.length > LIMIT_TEXT_LENGTH ? 'text-red-400' : ''}>
            {content.length} / {LIMIT_TEXT_LENGTH}
          </div>
        </div>
      </div>
    </form>
  )
}

export default CopilotMain
