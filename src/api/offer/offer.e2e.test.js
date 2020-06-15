'use strict';

const request = require(`supertest`);
const server = require(`../../express`);
const {nanoid} = require(`nanoid`);

const {HttpCode} = require(`../../constants`);
const {getMockData} = require(`../../service/lib/get-mock-data`);

let mocks = [];

describe(`Тестирование API по маршруту Offers`, () => {
  beforeAll(async () => {
    mocks = await getMockData();
  });

  test(`When get offers status code should be 200`, async () => {
    const res = await request(server).get(`/api/offers`);

    expect(res.statusCode).toBe(HttpCode.OK);

    res.body.forEach((item) => {
      expect(item).toHaveProperty(`id`);
      expect(item).toHaveProperty(`title`);
    });
  });

  test(`When GET /api/offers/:offerId status code should be 200`, async () => {
    const res = await request(server).get(`/api/offers/${mocks[0].id}`);

    expect(res.statusCode).toBe(HttpCode.OK);
    expect(res.body).toHaveProperty(`id`);
    expect(res.body).toHaveProperty(`title`);
  });

  test(`When POST /api/offers status code should be 201`, async () => {
    const res = await request(server)
            .post(`/api/offers`)
            .send(
                {
                  id: nanoid(6),
                  category: [
                    `Посуда`
                  ],
                  description: `Jest test description`,
                  picture: `item08.jpg`,
                  title: `Jest test title`,
                  type: `offer`,
                  sum: 12225,
                  comments: [
                    {
                      id: nanoid(6),
                      text: `Jest comment 1`
                    }
                  ]
                }
            );

    expect(res.statusCode).toBe(HttpCode.CREATED);
    expect(res.body).toBe(res.body);

  });

  test(`When PUT /api/offers/:offerId status code should be 200`, async () => {
    const res = await request(server)
            .put(`/api/offers/${mocks[0].id}`)
            .send(
                {
                  id: nanoid(6),
                  category: [
                    `Посуда`
                  ],
                  description: `Jest test description`,
                  picture: `item08.jpg`,
                  title: `Jest test title`,
                  type: `offer`,
                  sum: 12225,
                  comments: [
                    {
                      id: nanoid(6),
                      text: `Jest comment 1`
                    }
                  ]
                }
            );
    expect(res.statusCode).toBe(HttpCode.OK);

  });

  test(`When DELETE /api/offers/:offerId status code should be 200`, async () => {
    const res = await request(server).delete(`/api/offers/${mocks[3].id}`);
    expect(res.statusCode).toBe(HttpCode.OK);

  });

  test(`When GET /api/offers/:offerId/comments status code should be 200`, async () => {
    const res = await request(server).get(`/api/offers/${mocks[1].id}/comments`);
    expect(res.statusCode).toBe(HttpCode.OK);

    res.body.forEach((item) => {
      expect(item).toHaveProperty(`id`);
      expect(item).toHaveProperty(`text`);
    });
  });

  test(`When DELETE /api/offers/:offerId/comments/:commentId status code should be 200`, async () => {
    const res = await request(server).delete(`/api/offers/${mocks[2].id}/comments/${mocks[2].comments[0].id}`);
    expect(res.statusCode).toBe(HttpCode.OK);

  });

  test(`When POST /api/offers/:offerId/comments status code should be 200`, async () => {
    const res = await request(server)
            .post(`/api/offers/${mocks[4].id}/comments`)
            .send({id: nanoid(6), text: `Jest test post comment`});
    expect(res.statusCode).toBe(HttpCode.CREATED);
  });

});
