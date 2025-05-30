# Coupon Engine

Create a coupon engine capable of handling:
1. Coupon generation
2. Coupon redemption

This engine should handle:
- Coupon generation by admin via internal admin dashboard
  - While generating coupon, admin also have to specify time range of coupon validity
  - Scope only for single coupon generation per admin entry
- Each coupon has several rules to be eligible for redemption:
  - Minimum purchase amount
  - Payment method used
- Successful coupon redemption will result in a cashback of fixed specific amount, for example 2k cashback.
- There's 2 type of coupon:
  1. Global coupon
      - this coupon is issued for all user
      - each user must only able to use the coupon once
      - there's maximum amount of coupon available for redemption. This will be specified when admin generates the coupon.
  2. User coupon
      - this coupon is issued for a specific user.
      - this coupon can only be used once by those user

Non functional requirement:
- Horizontally scallable
- High Availability, Low latency

## Solution Idea
### Endpoints
- Generate Coupon
- Validate Coupon
- Redeem Coupon

## Tech stack
DB options:
- Cassandra
<br>+ High write throughput 
<br>+ Sharded by default, equipped w/ distributed DB utilities (concensus alg, etc.)
<br>- Learning curve/needs developer's creativity
<br>- Cost

- Postgre
<br>+ Easier understanding
<br>- Lower throughput

Counter:
- Redis
<br>- To fastly track count of redemption
<br>- utilize INCR -> if value returned still < limit we can continue

Cache:
- Redis
<br>- Cache general static rules -> cnt of redemption, validity date, minimum purchase