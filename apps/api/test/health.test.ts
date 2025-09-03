// test/health.test.ts
import { describe, expect, it } from 'bun:test'
import { healthRoutes } from '../src/routes/health'

describe('Health Routes', () => {
    it('returns health check response', async () => {
        const response = await healthRoutes
            .handle(new Request('http://localhost/health'))
            .then((res) => res.json())

        expect(response).toEqual({ ok: true })
    })

    it('returns 200 status for health check', async () => {
        const response = await healthRoutes
            .handle(new Request('http://localhost/health'))

        expect(response.status).toBe(200)
    })
})
