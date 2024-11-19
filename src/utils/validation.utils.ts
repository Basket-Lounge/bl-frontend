import { z } from 'zod';


export const TeamPostValidation = z.object({
  title: z.string({
    required_error: '제목을 입력해주세요.',
  }).min(5, {
    message: '최소 5자 이상 입력해주세요.'
  }).max(128, {
    message: '최대 128자까지 입력 가능합니다.'
  }),
  content: z.string({
    required_error: '내용을 입력해주세요.',
  }).min(1,{
    message: '최소 1자 이상 입력해주세요.'
  }).max(2048, {
    message: '최대 2048자까지 입력 가능합니다.'
  }),
});

export const TeamPostCommentValidation = z.object({
  content: z.string({
    required_error: '내용을 입력해주세요.',
  }).min(1,{
    message: '최소 1자 이상 입력해주세요.'
  }).max(2048, {
    message: '최대 2048자까지 입력 가능합니다.'
  }),
});

export const UserInquiryValidation = z.object({
  title: z.string({
    required_error: '제목을 입력해주세요.',
  }).min(5, {
    message: '최소 5자 이상 입력해주세요.'
  }).max(128, {
    message: '최대 128자까지 입력 가능합니다.'
  }),

  typeId: z.number({
    required_error: '문의 유형을 선택해주세요.',
  }),

  content: z.string({
    required_error: '내용을 입력해주세요.',
  }).min(1,{
    message: '최소 1자 이상 입력해주세요.'
  }).max(2048, {
    message: '최대 2048자까지 입력 가능합니다.'
  }),
});


export const UserReportValidation = z.object({
  title: z.string({
    required_error: '제목을 입력해주세요.',
  }).min(5, {
    message: '최소 5자 이상 입력해주세요.'
  }).max(128, {
    message: '최대 128자까지 입력 가능합니다.'
  }),

  typeId: z.number({
    required_error: '신고 유형을 선택해주세요.',
  }),

  description: z.string({
    required_error: '내용을 입력해주세요.',
  }).min(1,{
    message: '최소 1자 이상 입력해주세요.'
  }).max(2048, {
    message: '최대 2048자까지 입력 가능합니다.'
  }),
});